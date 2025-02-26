import { CSSProperties, useCallback, useContext, useMemo } from "react";
// import rosters from "../../assets/teams/rosters.json";
import { Player, StatsCategories } from "../../utils/types";
import { useSortColumns } from "../../hooks/useSortColumns";
import { DataContext } from "../../context/DataContext";

export interface PlayerWithAdvancedStats extends Player {
  raterBySalary: number;
  oldRaterBySalary: number;
  raterByGames: number;
  team: string;
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
  const { teams } = useContext(DataContext);
  const averageGamesPlayed = useMemo(() => {
    const gamesPlayed = teams
      .map((team) => team.roster)
      .flat()
      .map((player) => player.gamesPlayed);
    return gamesPlayed.reduce((a, b) => a + b) / gamesPlayed.length;
  }, [teams]);

  const parsePlayerToAdvanced = useCallback(
    (player: Player, teamName: string): PlayerWithAdvancedStats => {
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
        team: teamName,
      };
    },
    [averageGamesPlayed, categoriesToOmit]
  );

  const flatPlayers = useMemo(() => {
    return teams
      .map((team) =>
        team.roster.map((player) => {
          return parsePlayerToAdvanced(player, team.abbreviation);
        })
      )
      .flat();
  }, [parsePlayerToAdvanced, teams]);

  // const isLocal = location.hostname === "localhost";

  const { columnIcon, sortColumn, sortedOptions, sortColumnByArgument } =
    useSortColumns({ options: flatPlayers });

  return (
    <table>
      <thead>
        <th>Rk</th>
        <th>Team</th>
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
          R / salaire {sortColumn === "raterBySalary" ? columnIcon : null}
        </th>
        {/* {isLocal && (
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
        )} */}
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
          R / match
        </th>
      </thead>
      <tbody>
        {sortedOptions.map((player, index) => {
          return (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.team}</td>
              <td style={cellStyle}>{player.fullName}</td>
              <td style={cellStyle}>{player.currentRater.toFixed(2)}</td>
              <td style={cellStyle}>{player.salary}</td>
              <td style={cellStyle}>{player.raterBySalary.toFixed(2)}</td>
              {/* {isLocal && (
                <>
                  <td style={cellStyle}>{player.previousRater.toFixed(2)}</td>
                  <td style={cellStyle}>
                    {player.oldRaterBySalary.toFixed(2)}
                  </td>
                </>
              )} */}
              <td style={cellStyle}>{player.gamesPlayed}</td>
              <td style={cellStyle}>{player.raterByGames.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
