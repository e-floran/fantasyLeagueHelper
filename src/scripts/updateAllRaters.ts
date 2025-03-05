import rosters from "../assets/teams/rosters.json";
import rater2024 from "../assets/rater/rater2024.json";
import { Player, RatedRawPlayer, Team } from "../utils/types";
import { downloadElement } from "../utils/utils";

export const updateAllRaters = () => {
  const teams = [...rosters.teams];
  const newTeams: Team[] = [];
  teams.forEach((team) => {
    const newPlayers: Player[] = team.roster.map((player) => {
      const ratedPlayer = (rater2024 as RatedRawPlayer[]).find(
        (singlePlayer) => singlePlayer.id === player.id
      );
      const newPlayer: Player = {
        ...player,
        previousRater: ratedPlayer ? ratedPlayer.ratings[0].totalRating : 0,
      };
      if (!ratedPlayer) {
        newPlayer.hasNotPlayedLastSeason = true;
      }
      return newPlayer;
    });
    newTeams.push({ ...team, roster: newPlayers });
  });
  const newRosters = { ...rosters, teams: newTeams };
  downloadElement(newRosters, "rosters");
};
