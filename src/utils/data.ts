/* eslint-disable @typescript-eslint/no-unused-vars */
import playersWithBothRaters from "../assets/teams/playersWithBothRaters.json";
import rostersBefore20242025draft from "../assets/teams/rostersBefore20242025draft.json";
import { Team, Player } from "./types";
import { computeNewSalary, parseNegativeValue } from "./utils";

type RawTeam = (typeof playersWithBothRaters)["teams"][number];
type RawPlayer = RawTeam["roster"][number];

// export const cleanPlayers = () => {
//   const keepers2024 = filterTeamKeys(playersWithBothRaters);
//   const element = document.createElement("a");
//   const textFile = new Blob([JSON.stringify(keepers2024)], {
//     type: "application/json",
//   });
//   element.href = URL.createObjectURL(textFile);
//   element.download = "rosters.json";
//   document.body.appendChild(element);
//   element.click();
// };

const filterPlayerKeys = (rawPlayer: RawPlayer): Player => {
  return {
    id: rawPlayer.id,
    fullName: rawPlayer.fullName,
    keeperHistory: rawPlayer.keeperHistory,
    keeperValue: rawPlayer.keeperValue,
    raters: rawPlayer.raters,
  };
};

const filterTeamKeys = (rawTeam: RawTeam): Team => {
  const cleanedPlayers = rawTeam.roster.map((player) =>
    filterPlayerKeys(player)
  );
  return {
    id: rawTeam.id,
    name: rawTeam.name,
    roster: cleanedPlayers,
  };
};

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
