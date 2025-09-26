import { addNewPlayers, checkUnpickablePlayersStatus } from "../utils/data";
import {
  RatedRawPlayer,
  RawTeam,
  Team,
  UnpickablePlayer,
} from "../utils/types";
import rosters from "../assets/teams/rosters.json";
import rater2024 from "../assets/rater/rater2024.json";
import { downloadElement } from "../utils/utils";
import { Dispatch, SetStateAction } from "react";

const raterUrl =
  "https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/3409?scoringPeriodId=7&view=kona_player_info&view=mStatRatings";

export async function dailyUpdate(
  setIsUpdating: Dispatch<SetStateAction<boolean>>,
  handleDataRefresh?: (
    newTeams: Team[],
    newUnpickables: UnpickablePlayer[],
    newUpdate: Date
  ) => void
) {
  setIsUpdating(true);
  const newRosters: RawTeam[] = [];
  let newRaters: RatedRawPlayer[] = [];
  const ratersHeaders = {
    "X-Fantasy-Filter": {
      players: {
        filterSlotIds: { value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        limit: 750,
        offset: 0,
        sortRating: {
          additionalValue: null,
          sortAsc: false,
          sortPriority: 1,
          value: 0,
        },
        filterRanksForScoringPeriodIds: { value: [7] },
        filterRanksForRankTypes: { value: ["STANDARD"] },
        filterStatsForTopScoringPeriodIds: {
          value: 5,
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
  const req = new Request(raterUrl);
  req.headers.set(
    "X-Fantasy-Filter",
    JSON.stringify(ratersHeaders["X-Fantasy-Filter"])
  );
  await fetch(req)
    .then((response) => response.json())
    .then((json: { players: RatedRawPlayer[] }) => {
      newRaters = [...json.players];
    })
    .catch((error) => console.log(error));

  for (let i = 1; i < 17; i++) {
    const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2026/segments/0/leagues/3409?rosterForTeamId=${i}&view=mRoster`;
    await fetch(url)
      .then((response) => response.json())
      .then((json: { teams: RawTeam[] }) => {
        const teamRoster = json.teams.find((team) => team.id === i);
        if (teamRoster) newRosters.push(teamRoster);
      })
      .catch((error) => console.log(error));
  }
  const ratedPlayers = rater2024 as unknown as RatedRawPlayer[];

  const outputRosters = addNewPlayers(
    rosters.teams,
    newRosters,
    ratedPlayers,
    newRaters
  );
  const unpickablePlayers = await checkUnpickablePlayersStatus(
    rosters.unpickablePlayers
  );
  const output = {
    lastUpdate: new Date(),
    teams: outputRosters,
    unpickablePlayers,
  };
  if (handleDataRefresh) {
    handleDataRefresh(outputRosters, unpickablePlayers, output.lastUpdate);
    return;
  }
  downloadElement(output, "rosters", setIsUpdating);
}
