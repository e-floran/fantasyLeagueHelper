import {
  AcquisitionTypeEnum,
  Player,
  RatedRawPlayer,
  RawPlayer,
  RawTeam,
  Team,
} from "./types";

const filterPlayerKeys = (rawPlayer: RawPlayer): Player => {
  return {
    id: rawPlayer.playerId,
    fullName: rawPlayer.playerPoolEntry.player.fullName,
    keeperHistory: [],
    salary: rawPlayer.playerPoolEntry.keeperValueFuture,
    raters: { "2024": 0, "2025": 0 },
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
  parsedPlayer.raters = {
    "2024": typeof lastRater === "number" ? lastRater : 0,
    "2025": currentRater,
  };
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
    raters: { "2024": playerToAdd.raters[2024], "2025": currentRater },
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
            raters: {
              "2024": previousPlayer.raters[2024],
              "2025": currentRater,
            },
            gamesPlayed,
          });
        }
      }
    });
    outputRosters.push({ ...oldTeam, roster: rosterToBuild });
  });
  return outputRosters;
};
