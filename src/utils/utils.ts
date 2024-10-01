// import draft2024 from "../assets/drafts/draft2024.json";
// import draft2023 from "../assets/drafts/draft2023.json";
// import draft2022 from "../assets/drafts/draft2022.json";
// import offSeason2024 from "../assets/teams/offSeason2024.json";
// import cleanedPlayers2024 from "../assets/teams/cleanedPlayers2024.json";
// import playersWithHistory2024 from "../assets/teams/playersWithHistory2024.json";
// import rater2024 from "../assets/rater/rater2024.json";
// import playersWith2024Rater from "../assets/teams/playersWith2024Rater.json";
// import rater2023 from "../assets/rater/rater2023.json";

// type PlayerBase =
//   (typeof cleanedPlayers2024)["teams"][number]["roster"][number];
// type PlayerWithHistory = PlayerBase & { keeperHistory: string[] };
// type PlayerWithRaters = PlayerWithHistory & {
//   raters: { "2023": number; "2024": number };
//   keeperValue: number;
// };

// interface SimplifiedRatedPlayer {
//   id: number;
//   keeperValue: number;
//   ratings: {
//     "0": {
//       totalRating: number;
//     };
//   };
// }

// interface SimplifiedRater {
//   players: SimplifiedRatedPlayer[];
// }

// export const getKeeperHistory = () => {
//   const {
//     draftDetail: { picks: draftDetail2024 },
//   } = draft2024;
//   const {
//     draftDetail: { picks: draftDetail2023 },
//   } = draft2023;
//   const {
//     draftDetail: { picks: draftDetail2022 },
//   } = draft2022;
//   const newTeams = [...cleanedPlayers2024.teams].map((singleTeam) => {
//     const newRoster = singleTeam.roster.map((singlePlayer) => {
//       const { id } = singlePlayer;
//       const newPlayer: PlayerWithHistory = {
//         ...singlePlayer,
//         keeperHistory: [],
//       };
//       if (
//         draftDetail2024.some((singlePick) => {
//           return singlePick.playerId === id && singlePick.keeper;
//         })
//       ) {
//         newPlayer.keeperHistory.push("2024");
//         if (
//           draftDetail2023.some((singlePick) => {
//             return singlePick.playerId === id && singlePick.keeper;
//           })
//         ) {
//           newPlayer.keeperHistory.push("2023");
//           if (
//             draftDetail2022.some((singlePick) => {
//               return singlePick.playerId === id && singlePick.keeper;
//             })
//           ) {
//             newPlayer.keeperHistory.push("2022");
//           }
//         }
//       }
//       return newPlayer;
//     });
//     return { ...singleTeam, roster: newRoster };
//   });
//   return { teams: newTeams };
// };

// export const cleanRosters = () => {
//   const { teams } = offSeason2024;
//   const cleanedTeams = teams.map((team) => {
//     const {
//       roster: { entries },
//     } = team;
//     const newRoster = entries.map((singlePlayer) => {
//       return { ...singlePlayer.playerPoolEntry.player };
//     });
//     return { ...team, roster: newRoster };
//   });
//   return cleanedTeams;
// };

// export const add2024RaterValue = () => {
//   const newTeams = [...playersWithHistory2024.teams].map((singleTeam) => {
//     const newRoster = singleTeam.roster.map((singlePlayer) => {
//       const newPlayer: PlayerWithRaters = {
//         ...singlePlayer,
//         raters: { "2023": 0, "2024": 0 },
//         keeperValue: 0,
//       };
//       const raterPlayer = (rater2024 as SimplifiedRater).players.find(
//         (player) => player.id === singlePlayer.id
//       );
//       if (raterPlayer) {
//         newPlayer.raters["2024"] = raterPlayer.ratings["0"].totalRating;
//         newPlayer.keeperValue = raterPlayer.keeperValue;
//       } else {
//         console.log("NO RATER : ", newPlayer.fullName);
//       }
//       return newPlayer;
//     });
//     return { ...singleTeam, roster: newRoster };
//   });
//   return { teams: newTeams };
// };

// export const add2023RaterValue = () => {
//   const newTeams = [...playersWith2024Rater.teams].map((singleTeam) => {
//     const newRoster = singleTeam.roster.map((singlePlayer) => {
//       const raterPlayer = (rater2023 as SimplifiedRater).players.find(
//         (player) => player.id === singlePlayer.id
//       );
//       const newPlayer = { ...singlePlayer };
//       if (raterPlayer) {
//         newPlayer.raters["2023"] = raterPlayer.ratings["0"].totalRating;
//       } else {
//         console.log("NO RATER : ", newPlayer.fullName);
//       }
//       return newPlayer;
//     });
//     return { ...singleTeam, roster: newRoster };
//   });
//   return { teams: newTeams };
// };

export const parseNegativeValue = (value: number, limit?: number): number => {
  const trueLimit = limit ?? 0;
  return value < trueLimit ? trueLimit : value;
};

export const computeNewSalary = (
  keeperValue: number,
  keeperHistory: number,
  omitDelta: boolean,
  raterDelta: number
) => {
  const valueWithKeeps =
    keeperHistory >= 2 ? keeperValue + (keeperHistory - 1) * 5 : keeperValue;
  if (!raterDelta || omitDelta) {
    return valueWithKeeps;
  }
  if (raterDelta < -3) {
    return valueWithKeeps - 5;
  } else if (raterDelta < -2.5) {
    return valueWithKeeps - 4;
  } else if (raterDelta < -2) {
    return valueWithKeeps - 3;
  } else if (raterDelta < -1.5) {
    return valueWithKeeps - 2;
  } else if (raterDelta < -1) {
    return valueWithKeeps - 1;
  } else if (raterDelta < -0.5) {
    return valueWithKeeps;
  } else if (raterDelta < 0.5) {
    return valueWithKeeps + 1;
  } else if (raterDelta < 1.5) {
    return valueWithKeeps + 2;
  } else if (raterDelta < 2) {
    return valueWithKeeps + 3;
  } else if (raterDelta < 3) {
    return valueWithKeeps + 4;
  } else {
    return valueWithKeeps + 5;
  }
};

// const cleanPlayers = () => {
//   // const cleanedRosters = cleanRosters();
//   // const addedHistory = getKeeperHistory();
//   // const added2024 = add2024RaterValue();
//   const added2023 = add2023RaterValue();
//   const element = document.createElement("a");
//   const textFile = new Blob([JSON.stringify(added2023)], {
//     type: "application/json",
//   });
//   element.href = URL.createObjectURL(textFile);
//   element.download = "playersWithBothRaters.json";
//   document.body.appendChild(element);
//   element.click();
// };
