/* eslint-disable @typescript-eslint/no-unused-vars */
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

// const filterTeamKeys = (rawTeam: RawTeam): Team => {
//   const cleanedPlayers = rawTeam.roster.entries.map((player) =>
//     filterPlayerKeys(player)
//   );
//   return {
//     id: rawTeam.id,
//     name: rawTeam.name,
//     roster: cleanedPlayers,
//   };
// };

// const updatePlayerValue = (player: Player): NewPlayer => {
//   return {
//     id: player.id,
//     fullName: player.fullName,
//     keeperHistory: [...player.keeperHistory, "2025"],
//     raters: { "2024": player.raters[2024], "2025": 0 },
//     salary: parseNegativeValue(
//       computeNewSalary(
//         player.keeperValue,
//         player.keeperHistory.length,
//         player.raters[2023] === 0,
//         player.raters[2024] - parseNegativeValue(player.raters[2023])
//       ),
//       1
//     ),
//   };
// };

// const updateTeamsBeforeDraft = () => {
//   const teams = rostersBefore20242025draft.map((team) => {
//     const roster = team.roster.map((player) => updatePlayerValue(player));
//     return { ...team, roster };
//   });
//   return teams;
// };

const addFreeAgent = (
  newPlayer: RawPlayer,
  lastSeasonRaters: RatedRawPlayer[],
  rosterToBuild: Player[]
) => {
  const parsedPlayer = filterPlayerKeys(newPlayer);
  const lastRater = lastSeasonRaters.find(
    (ratedPlayer) => ratedPlayer.id === parsedPlayer.id
  )?.ratings["0"].totalRating;
  if (typeof lastRater === "number") {
    parsedPlayer.raters = { "2024": lastRater, "2025": 0 };
  }
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
  rosterToBuild: Player[]
) => {
  if (playersByPlayerId.size === 0) {
    initPlayersMap(playersByPlayerId, previousRosters);
  }
  const playerToAdd = playersByPlayerId.get(newPlayer.playerId);
  if (!playerToAdd) {
    return;
  }
  rosterToBuild.push(playerToAdd);
};

export const addNewPlayers = (
  previousRosters: Team[],
  newRosters: RawTeam[],
  lastSeasonRaters: RatedRawPlayer[]
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
      if (
        !oldTeam.roster.some((oldPlayer) => oldPlayer.id === newPlayer.playerId)
      ) {
        if (newPlayer.acquisitionType === AcquisitionTypeEnum.ADD) {
          addFreeAgent(newPlayer, lastSeasonRaters, rosterToBuild);
        }
        if (newPlayer.acquisitionType === AcquisitionTypeEnum.TRADE) {
          addTradedPlayer(
            newPlayer,
            playersByPlayerId,
            previousRosters,
            rosterToBuild
          );
        }
        // const parsedPlayer = filterPlayerKeys(newPlayer);
        // const lastRater = lastSeasonRaters.find(
        //   (ratedPlayer) => ratedPlayer.id === parsedPlayer.id
        // )?.ratings["0"].totalRating;
        // if (typeof lastRater === "number") {
        //   parsedPlayer.raters = { "2024": lastRater, "2025": 0 };
        // }
        // rosterToBuild.push(parsedPlayer);
      } else {
        const previousPlayer = oldTeam.roster.find(
          (oldPlayer) => oldPlayer.id === newPlayer.playerId
        );
        if (previousPlayer) {
          rosterToBuild.push({
            ...previousPlayer,
            injuredSpot: newPlayer.lineupSlotId === 13,
          });
        }
      }
    });
    outputRosters.push({ ...oldTeam, roster: rosterToBuild });
  });
  return outputRosters;
};
