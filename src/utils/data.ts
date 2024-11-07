import {
  AcquisitionTypeEnum,
  Player,
  PlayerCategoriesRaters,
  PlayerRatings,
  RatedRawPlayer,
  RawPlayer,
  RawTeam,
  StatsCategories,
  Team,
  UnpickablePlayer,
} from "./types";

const RaterCategories = new Map([
  [19, StatsCategories.FG],
  [20, StatsCategories.FT],
  [17, StatsCategories["3PM"]],
  [6, StatsCategories.REB],
  [3, StatsCategories.AST],
  [2, StatsCategories.STL],
  [1, StatsCategories.BLK],
  [11, StatsCategories.TO],
  [0, StatsCategories.PTS],
]);

const basePlayerRaters: PlayerCategoriesRaters = {
  [StatsCategories.FG]: 0,
  [StatsCategories.FT]: 0,
  [StatsCategories["3PM"]]: 0,
  [StatsCategories.REB]: 0,
  [StatsCategories.AST]: 0,
  [StatsCategories.STL]: 0,
  [StatsCategories.BLK]: 0,
  [StatsCategories.TO]: 0,
  [StatsCategories.PTS]: 0,
};

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
    categoriesRaters: basePlayerRaters,
    previousCategoriesRaters: basePlayerRaters,
  };
};

const buildPlayerRaters = (
  rawRater: PlayerRatings | undefined
): PlayerCategoriesRaters => {
  const output = basePlayerRaters;
  if (rawRater) {
    rawRater.statRankings.forEach((value) => {
      const key = RaterCategories.get(value.forStat);
      if (key) {
        output[key] = value.rating;
      }
    });
  }
  return { ...output };
};

const addFreeAgent = (
  newPlayer: RawPlayer,
  lastSeasonRaters: RatedRawPlayer[],
  rosterToBuild: Player[],
  currentRater: PlayerRatings | undefined,
  gamesPlayed: number
) => {
  const parsedPlayer = filterPlayerKeys(newPlayer);
  const previousRaters = lastSeasonRaters.find(
    (ratedPlayer) => ratedPlayer.id === parsedPlayer.id
  )?.ratings["0"];
  parsedPlayer.previousRater = previousRaters ? previousRaters.totalRating : 0;
  parsedPlayer.currentRater = currentRater?.totalRating ?? 0;
  parsedPlayer.gamesPlayed = gamesPlayed;
  parsedPlayer.categoriesRaters = buildPlayerRaters(currentRater);
  parsedPlayer.previousCategoriesRaters = buildPlayerRaters(previousRaters);
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
  currentRater: PlayerRatings | undefined,
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
    currentRater: currentRater?.totalRating ?? 0,
    gamesPlayed,
    categoriesRaters: buildPlayerRaters(currentRater),
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
      const currentRater = currentRaters.find(
        (ratedPlayer) => ratedPlayer.id === newPlayer.playerId
      );
      if (newPlayer.playerId === 3112335) {
        console.log(newPlayer, currentRater);
      }
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
            currentRater?.ratings[0],
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
            currentRater?.ratings[0],
            gamesPlayed
          );
        }
      } else {
        const previousPlayer = oldTeam.roster.find(
          (oldPlayer) => oldPlayer.id === newPlayer.playerId
        );
        if (previousPlayer) {
          const previousRaters = lastSeasonRaters.find(
            (ratedPlayer) => ratedPlayer.id === previousPlayer.id
          )?.ratings["0"];

          rosterToBuild.push({
            ...previousPlayer,
            injuredSpot: newPlayer.lineupSlotId === 13,
            currentRater: currentRater?.ratings[0].totalRating ?? 0,
            gamesPlayed,
            categoriesRaters: buildPlayerRaters(currentRater?.ratings[0]),
            previousCategoriesRaters: buildPlayerRaters(previousRaters),
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
