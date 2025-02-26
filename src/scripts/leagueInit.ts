import { Dispatch, SetStateAction } from "react";
import { initTeams } from "../utils/initData";
import {
  RatedRawPlayer,
  // RawInitMember,
  RawInitTeam,
  RawTeam,
  Team,
} from "../utils/types";

export async function leagueInit(
  leagueId: string,
  setTeams: Dispatch<SetStateAction<Team[]>>
) {
  // INIT
  // let members: RawInitMember[] = [];
  // let previousSeasons: number[] = [];
  let teamsBase: RawInitTeam[] = [];
  const initUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/${leagueId}?view=modular&view=mNav&view=mStatus&view=mSettings&view=mTeam&view=mPendingTransactions`;
  const initReq = new Request(initUrl);
  await fetch(initReq)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // members = [...json.members];
      teamsBase = [...json.teams];
      // previousSeasons = [...json.status.previousSeasons];
    })
    .catch((error) => console.error(error));

  // RATERS
  let raters: RatedRawPlayer[] = [];
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
  const ratersUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/${leagueId}?scoringPeriodId=7&view=kona_player_info&view=mStatRatings`;
  const ratersReq = new Request(ratersUrl);
  ratersReq.headers.set(
    "X-Fantasy-Filter",
    JSON.stringify(ratersHeaders["X-Fantasy-Filter"])
  );
  await fetch(ratersReq)
    .then((response) => response.json())
    .then((json: { players: RatedRawPlayer[] }) => {
      raters = [...json.players];
    })
    .catch((error) => console.log(error));

  // ROSTERS
  const rosters: RawTeam[] = [];

  for (let i = 1; i < teamsBase.length + 1; i++) {
    const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/${leagueId}?rosterForTeamId=${i}&view=mRoster`;
    await fetch(url)
      .then((response) => response.json())
      .then((json: { teams: RawTeam[] }) => {
        const teamRoster = json.teams.find((team) => team.id === i);
        if (teamRoster) rosters.push(teamRoster);
      })
      .catch((error) => console.log(error));
  }

  // OUTPUT
  const builtTeams = initTeams(teamsBase, rosters, raters);
  console.log(builtTeams);
  setTeams(builtTeams);
}
