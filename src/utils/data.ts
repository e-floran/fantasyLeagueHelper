import {
  AcquisitionTypeEnum,
  Player,
  RatedRawPlayer,
  RawPlayer,
  RawTeam,
  Team,
  UnpickablePlayer,
} from "./types";

const filterPlayerKeys = (rawPlayer: RawPlayer): Player => {
  return {
    id: rawPlayer.playerId,
    fullName: rawPlayer.playerPoolEntry.player.fullName,
    keeperHistory: [],
    salary: rawPlayer.playerPoolEntry.keeperValueFuture,
    previousRater: 0,
    currentRater: 0,
    gamesPlayed: 0,
    injuredSpot: rawPlayer.lineupSlotId === 13,
  };
};

const addFreeAgent = (
  newPlayer: RawPlayer,
  lastSeasonRaters: RatedRawPlayer[],
  rosterToBuild: Player[],
  currentRater: number,
  gamesPlayed: number
) => {
  const parsedPlayer = filterPlayerKeys(newPlayer);
  const lastRater = lastSeasonRaters.find(
    (ratedPlayer) => ratedPlayer.id === parsedPlayer.id
  )?.ratings["0"].totalRating;
  parsedPlayer.previousRater = typeof lastRater === "number" ? lastRater : 0;
  parsedPlayer.currentRater = currentRater;
  parsedPlayer.gamesPlayed = gamesPlayed;
  rosterToBuild.push(parsedPlayer);
};

const initPlayersMap = (
  playersByPlayerId: Map<number, Player>,
  previousRosters: Team[]
) => {
  previousRosters.forEach((team) => {
    team.roster.forEach((player) => {
      playersByPlayerId.set(player.id, player);
    });
  });
};

const addTradedPlayer = (
  newPlayer: RawPlayer,
  playersByPlayerId: Map<number, Player>,
  previousRosters: Team[],
  rosterToBuild: Player[],
  lastSeasonRaters: RatedRawPlayer[],
  currentRater: number,
  gamesPlayed: number
) => {
  if (playersByPlayerId.size === 0) {
    initPlayersMap(playersByPlayerId, previousRosters);
  }
  const playerToAdd = playersByPlayerId.get(newPlayer.playerId);
  if (!playerToAdd) {
    addFreeAgent(
      newPlayer,
      lastSeasonRaters,
      rosterToBuild,
      currentRater,
      gamesPlayed
    );
    return;
  }
  rosterToBuild.push({
    ...playerToAdd,
    injuredSpot: newPlayer.lineupSlotId === 13,
    currentRater,
    gamesPlayed,
  });
};

export const addNewPlayers = (
  previousRosters: Team[],
  newRosters: RawTeam[],
  lastSeasonRaters: RatedRawPlayer[],
  currentRaters: RatedRawPlayer[]
): Team[] => {
  const outputRosters: Team[] = [];

  const playersByPlayerId: Map<number, Player> = new Map();

  newRosters.forEach((newTeam) => {
    const newRoster = newTeam.roster.entries;
    const oldTeam: Team | undefined = previousRosters.find(
      (team) => team.id === newTeam.id
    );
    if (!oldTeam) {
      return;
    }
    const rosterToBuild: Player[] = [];

    newRoster.forEach((newPlayer) => {
      const currentRater =
        currentRaters.find(
          (ratedPlayer) => ratedPlayer.id === newPlayer.playerId
        )?.ratings["0"].totalRating ?? 0;
      const gamesPlayed =
        newPlayer.playerPoolEntry.player.stats.find(
          (statsEntry) => statsEntry.id === "002025"
        )?.stats[42] ?? 0;
      if (
        !oldTeam.roster.some((oldPlayer) => oldPlayer.id === newPlayer.playerId)
      ) {
        if (newPlayer.acquisitionType === AcquisitionTypeEnum.ADD) {
          addFreeAgent(
            newPlayer,
            lastSeasonRaters,
            rosterToBuild,
            currentRater,
            gamesPlayed
          );
        }
        if (newPlayer.acquisitionType === AcquisitionTypeEnum.TRADE) {
          addTradedPlayer(
            newPlayer,
            playersByPlayerId,
            previousRosters,
            rosterToBuild,
            lastSeasonRaters,
            currentRater,
            gamesPlayed
          );
        }
      } else {
        const previousPlayer = oldTeam.roster.find(
          (oldPlayer) => oldPlayer.id === newPlayer.playerId
        );
        if (previousPlayer) {
          rosterToBuild.push({
            ...previousPlayer,
            injuredSpot: newPlayer.lineupSlotId === 13,
            currentRater,
            gamesPlayed,
          });
        }
      }
    });
    outputRosters.push({ ...oldTeam, roster: rosterToBuild });
  });
  return outputRosters;
};

export const checkUnpickablePlayersStatus = async (
  players: UnpickablePlayer[]
) => {
  let outputPlayers = [...players];
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/3409?scoringPeriodId=12&view=kona_playercard`;
  for (const player of outputPlayers) {
    if (player.outForSeason) {
      continue;
    }
    const ratersHeaders = {
      "X-Fantasy-Filter": {
        players: {
          filterIds: { value: [player.id] },
          filterStatsForTopScoringPeriodIds: {
            value: 82,
            additionalValue: [
              "002025",
              "102025",
              "002024",
              "012025",
              "022025",
              "032025",
              "042025",
            ],
          },
        },
      },
    };
    const req = new Request(url);
    req.headers.set(
      "X-Fantasy-Filter",
      JSON.stringify(ratersHeaders["X-Fantasy-Filter"])
    );
    await fetch(req)
      .then((response) => response.json())
      .then((json: { players: RatedRawPlayer[] }) => {
        if (!json.players[0].player.injured) {
          outputPlayers = outputPlayers.filter(
            (injuredPlayer) => injuredPlayer.id !== player.id
          );
        }
      })
      .catch((error) => console.log(error));
  }
  return outputPlayers;
};
