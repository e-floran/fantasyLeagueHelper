import { CSSProperties, useCallback, useMemo } from "react";
import rosters from "../../assets/teams/rosters.json";
import { Player, StatsCategories } from "../../utils/types";
import { useSortColumns } from "../../hooks/useSortColumns";

export interface PlayerWithAdvancedStats extends Player {
  raterBySalary: number;
  oldRaterBySalary: number;
  raterByGames: number;
}

interface AdvancedTableProps {
  headerStyle: CSSProperties;
  cellStyle: CSSProperties;
  categoriesToOmit: StatsCategories[];
}

export const AdvancedTable = ({
  headerStyle,
  cellStyle,
  categoriesToOmit,
}: AdvancedTableProps) => {
  const averageGamesPlayed = useMemo(() => {
    const gamesPlayed = rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => player.gamesPlayed);
    return gamesPlayed.reduce((a, b) => a + b) / gamesPlayed.length;
  }, []);

  const parsePlayerToAdvanced = useCallback(
    (player: Player): PlayerWithAdvancedStats => {
      let newCurrentRater = player.currentRater;
      let newPreviousRater = player.previousRater;
      if (categoriesToOmit.length) {
        categoriesToOmit.forEach((category) => {
          newCurrentRater -= player.categoriesRaters[category];
          newPreviousRater -= player.previousCategoriesRaters[category];
        });
      }
      return {
        ...player,
        currentRater: newCurrentRater,
        previousRater: newPreviousRater,
        raterBySalary: newCurrentRater / player.salary,
        oldRaterBySalary: player.previousRater / player.salary,
        raterByGames: player.gamesPlayed
          ? (newCurrentRater / player.gamesPlayed) * averageGamesPlayed
          : 0,
      };
    },
    [averageGamesPlayed, categoriesToOmit]
  );

  const flatPlayers = useMemo(() => {
    return rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => {
        return parsePlayerToAdvanced(player);
      });
  }, [parsePlayerToAdvanced]);

  const isLocal = location.hostname === "localhost";

  const { columnIcon, sortColumn, sortedOptions, sortColumnByArgument } =
    useSortColumns({ options: flatPlayers });

  return (
    <table>
      <thead>
        <th
          style={headerStyle}
          onClick={() => sortColumnByArgument("fullName")}
        >
          Nom {sortColumn === "fullName" ? columnIcon : null}
        </th>
        <th
          style={headerStyle}
          onClick={() => sortColumnByArgument("currentRater")}
        >
          Rater {sortColumn === "currentRater" ? columnIcon : null}
        </th>
        <th style={headerStyle} onClick={() => sortColumnByArgument("salary")}>
          Salaire {sortColumn === "salary" ? columnIcon : null}
        </th>
        <th
          style={headerStyle}
          onClick={() => sortColumnByArgument("raterBySalary")}
        >
          Rater/salaire {sortColumn === "raterBySalary" ? columnIcon : null}
        </th>
        {isLocal && (
          <>
            <th
              style={headerStyle}
              onClick={() => sortColumnByArgument("previousRater")}
            >
              Ancien rater {sortColumn === "previousRater" ? columnIcon : null}
            </th>
            <th
              style={headerStyle}
              onClick={() => sortColumnByArgument("oldRaterBySalary")}
            >
              Ancien rater/salaire{" "}
              {sortColumn === "oldRaterBySalary" ? columnIcon : null}
            </th>
          </>
        )}
        <th
          style={headerStyle}
          onClick={() => sortColumnByArgument("gamesPlayed")}
        >
          Matchs joués
        </th>
        <th
          style={headerStyle}
          onClick={() => sortColumnByArgument("raterByGames")}
        >
          Rater/matchs *
        </th>
      </thead>
      <tbody>
        {sortedOptions.map((player) => {
          return (
            <tr key={player.id}>
              <td style={cellStyle}>{player.fullName}</td>
              <td style={cellStyle}>{player.currentRater.toFixed(2)}</td>
              <td style={cellStyle}>{player.salary}</td>
              <td style={cellStyle}>{player.raterBySalary.toFixed(2)}</td>
              {isLocal && (
                <>
                  <td style={cellStyle}>{player.previousRater.toFixed(2)}</td>
                  <td style={cellStyle}>
                    {player.oldRaterBySalary.toFixed(2)}
                  </td>
                </>
              )}
              <td style={cellStyle}>{player.gamesPlayed}</td>
              <td style={cellStyle}>{player.raterByGames.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
