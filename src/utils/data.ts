/* eslint-disable @typescript-eslint/no-unused-vars */
// import playersWithBothRaters from "../assets/teams/playersWithBothRaters.json";
// import rostersBefore20242025draft from "../assets/teams/rostersBefore20242025draft.json";
// import { Team, Player } from "./types";
// import { computeNewSalary, parseNegativeValue } from "./utils";
// import postDraft from "../assets/teams/postDraft.json";
// import rosters from "../assets/teams/rosters.json";
// import rater2024 from "../assets/teams/rater2024.json";

// type RawTeam = (typeof postDraft)["teams"][number];
// type RawPlayer = RawTeam["roster"]["entries"][number]["playerPoolEntry"];
// interface RatedPlayer {
//   id: number;
//   ratings: {
//     "0": {
//       totalRating: number;
//     };
//   };
// }
// interface RawRater {
//   players: RatedPlayer[];
// }

// const filterPlayerKeys = (rawPlayer: RawPlayer): Player => {
//   return {
//     id: rawPlayer.id,
//     fullName: rawPlayer.player.fullName,
//     keeperHistory: [],
//     salary: rawPlayer.keeperValueFuture,
//     raters: { "2024": 0, "2025": 0 },
//   };
// };

// const filterTeamKeys = (rawTeam: RawTeam): Team => {
//   const cleanedPlayers = rawTeam.roster.map((player) =>
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

// export const addNewPlayersAfterDraft = (): void => {
//   const keeperRosters: Team[] = rosters;
//   const postDraftRosters: RawTeam[] = postDraft.teams;
//   const lastSeasonRaters = (rater2024 as unknown as RawRater).players;

//   const outputRosters: Team[] = [];

//   postDraftRosters.forEach((newTeam) => {
//     const newRoster = newTeam.roster.entries;
//     const oldTeam: Team | undefined = keeperRosters.find(
//       (team) => team.id === newTeam.id
//     );
//     if (!oldTeam) {
//       return;
//     }
//     const rosterToBuild: Player[] = oldTeam.roster;

//     newRoster.forEach((newPlayer) => {
//       if (
//         !rosterToBuild.some((oldPlayer) => oldPlayer.id === newPlayer.playerId)
//       ) {
//         const parsedPlayer = filterPlayerKeys(newPlayer.playerPoolEntry);
//         const lastRater = lastSeasonRaters.find(
//           (ratedPlayer) => ratedPlayer.id === parsedPlayer.id
//         )?.ratings["0"].totalRating;
//         if (typeof lastRater === "number") {
//           parsedPlayer.raters = { "2024": lastRater, "2025": 0 };
//         }
//         rosterToBuild.push(parsedPlayer);
//       }
//     });
//     outputRosters.push({ ...oldTeam, roster: rosterToBuild });
//   });
//   const output = { lastUpdate: new Date(), teams: outputRosters };
//   const element = document.createElement("a");
//   const textFile = new Blob([JSON.stringify(output)], {
//     type: "application/json",
//   });
//   element.href = URL.createObjectURL(textFile);
//   element.download = "rostersNew.json";
//   document.body.appendChild(element);
//   element.click();
// };
