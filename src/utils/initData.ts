import { addFreeAgent } from "./data";
import { Player, RatedRawPlayer, RawInitTeam, RawTeam, Team } from "./types";

export const initTeams = (
  baseTeams: RawInitTeam[],
  rosters: RawTeam[],
  raters: RatedRawPlayer[]
): Team[] => {
  const outputRosters: Team[] = [];
  rosters.forEach((rawTeam) => {
    const newRoster = rawTeam.roster.entries;

    const rosterToBuild: Player[] = [];

    newRoster.forEach((newPlayer) => {
      const currentRater = raters.find(
        (ratedPlayer) => ratedPlayer.id === newPlayer.playerId
      );

      const gamesPlayed =
        newPlayer.playerPoolEntry.player.stats.find(
          (statsEntry) => statsEntry.id === "002025"
        )?.stats[42] ?? 0;
      const rawStats = newPlayer.playerPoolEntry.player.stats.find(
        (statsEntry) => statsEntry.id === "002025"
      )?.stats;
      addFreeAgent(
        newPlayer,
        [],
        rosterToBuild,
        currentRater?.ratings[0],
        gamesPlayed,
        rawStats
      );
    });
    const baseTeam = baseTeams.find((team) => team.id === rawTeam.id);
    outputRosters.push({
      id: rawTeam.id,
      name: baseTeam?.name ?? "",
      abbreviation: baseTeam?.abbrev ?? "",
      roster: rosterToBuild,
    });
  });
  console.log(outputRosters, rosters, baseTeams);
  return outputRosters.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
