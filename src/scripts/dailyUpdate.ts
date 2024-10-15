import { addNewPlayers } from "../utils/data";
import { RatedRawPlayer, RawTeam } from "../utils/types";
import rosters from "../assets/teams/rosters.json";
import rater2024 from "../assets/rater/rater2024.json";

export async function dailyUpdate() {
  const newRosters: RawTeam[] = [];

  for (let i = 1; i < 17; i++) {
    const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/3409?rosterForTeamId=${i}&view=mRoster`;
    await fetch(url)
      .then((response) => response.json())
      .then((json: { teams: RawTeam[] }) => {
        const teamRoster = json.teams.find((team) => team.id === i);
        if (teamRoster) newRosters.push(teamRoster);
      })
      .catch((error) => console.log(error));
  }
  const ratedPlayers = (rater2024 as unknown as { players: RatedRawPlayer[] })
    .players;
  const outputRosters = addNewPlayers(rosters.teams, newRosters, ratedPlayers);
  const output = { lastUpdate: new Date(), teams: outputRosters };
  const element = document.createElement("a");
  const textFile = new Blob([JSON.stringify(output)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(textFile);
  element.download = "rostersNew.json";
  document.body.appendChild(element);
  element.click();
}
