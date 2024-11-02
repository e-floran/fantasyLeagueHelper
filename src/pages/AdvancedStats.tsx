import { CSSProperties, ReactElement, useMemo } from "react";
import rosters from "../assets/teams/rosters.json";
import { Player } from "../utils/types";
import { createStyles } from "../utils/style";
import { useSortColumns } from "../hooks/useSortColumns";

export interface PlayerWithAdvancedStats extends Player {
  raterBySalary: number;
  oldRaterBySalary: number;
  raterByGames: number;
}

export const AdvancedStats = (): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    columnHeader: {
      cursor: "pointer",
    },
  });

  const averageGamesPlayed = useMemo(() => {
    const gamesPlayed = rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => player.gamesPlayed);
    return gamesPlayed.reduce((a, b) => a + b) / gamesPlayed.length;
  }, []);

  const flatPlayers = useMemo(() => {
    return rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => {
        return {
          ...player,
          raterBySalary: player.currentRater / player.salary,
          oldRaterBySalary: player.previousRater / player.salary,
          raterByGames: player.gamesPlayed
            ? (player.currentRater / player.gamesPlayed) * averageGamesPlayed
            : 0,
        };
      });
  }, [averageGamesPlayed]);

  const isLocal = location.hostname === "localhost";

  const { columnIcon, sortColumn, sortedPlayers, sortColumnByArgument } =
    useSortColumns({ players: flatPlayers });

  return (
    <main>
      <section>
        <h2>Statistiques avancées</h2>
        <table>
          <thead>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("fullName")}
            >
              Nom {sortColumn === "fullName" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("currentRater")}
            >
              Rater {sortColumn === "currentRater" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("salary")}
            >
              Salaire {sortColumn === "salary" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("raterBySalary")}
            >
              Rater/salaire {sortColumn === "raterBySalary" ? columnIcon : null}
            </th>
            {isLocal && (
              <>
                <th
                  style={styles.columnHeader}
                  onClick={() => sortColumnByArgument("previousRater")}
                >
                  Ancien rater{" "}
                  {sortColumn === "previousRater" ? columnIcon : null}
                </th>
                <th
                  style={styles.columnHeader}
                  onClick={() => sortColumnByArgument("oldRaterBySalary")}
                >
                  Ancien rater/salaire{" "}
                  {sortColumn === "oldRaterBySalary" ? columnIcon : null}
                </th>
              </>
            )}
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("gamesPlayed")}
            >
              Matchs joués
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("raterByGames")}
            >
              Rater/matchs joués *
            </th>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => {
              return (
                <tr>
                  <td>{player.fullName}</td>
                  <td>{player.currentRater.toFixed(2)}</td>
                  <td>{player.salary}</td>
                  <td>{player.raterBySalary.toFixed(2)}</td>
                  {isLocal && (
                    <>
                      <td>{player.previousRater.toFixed(2)}</td>
                      <td>{player.oldRaterBySalary.toFixed(2)}</td>
                    </>
                  )}
                  <td>{player.gamesPlayed}</td>
                  <td>{player.raterByGames.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <p>
          * : Les chiffres pour le rater par matchs joués sont multipliés par le
          nombre moyen de matchs joués, pour avoir des chiffres plus lisibles.
        </p>
      </section>
    </main>
  );
};
