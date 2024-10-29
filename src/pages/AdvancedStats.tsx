import { CSSProperties, ReactElement, useMemo, useState } from "react";
import rosters from "../assets/teams/rosters.json";
// import rostersNew from "../assets/teams/rostersNew.json";
import { Player } from "../utils/types";
import { createStyles } from "../utils/style";

interface PlayerWithAdvancedStats extends Player {
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
          raterBySalary: player.raters[2025] / player.salary,
          oldRaterBySalary: player.raters[2024] / player.salary,
          raterByGames: player.gamesPlayed
            ? (player.raters[2025] / player.gamesPlayed) * averageGamesPlayed
            : 0,
        };
      });
  }, [averageGamesPlayed]);

  const [sortOrder, setSortOrder] = useState("desc");
  const [columnIcon, setColumnIcon] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortedPlayers, setSortedPlayers] =
    useState<PlayerWithAdvancedStats[]>(flatPlayers);

  const isLocal = location.hostname === "localhost";

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setColumnIcon(columnIcon === "↓" ? "↑" : "↓");
  };

  const sortColumnByArgument = (column: string) => {
    toggleSortOrder();
    setSortColumn(column);
    const sortedPlayersList = [...(flatPlayers ?? [])].sort((a, b) => {
      switch (column) {
        case "name":
          if (sortOrder === "asc") {
            return a.fullName.localeCompare(b.fullName);
          } else {
            return b.fullName.localeCompare(a.fullName);
          }
        case "rater":
          if (sortOrder === "asc") {
            return a.raters[2025] - b.raters[2025];
          } else {
            return b.raters[2025] - a.raters[2025];
          }
        case "oldRater":
          if (sortOrder === "asc") {
            return a.raters[2024] - b.raters[2024];
          } else {
            return b.raters[2024] - a.raters[2024];
          }
        case "raterBySalary":
          if (sortOrder === "asc") {
            return a.raterBySalary - b.raterBySalary;
          } else {
            return b.raterBySalary - a.raterBySalary;
          }
        case "oldRaterBySalary":
          if (sortOrder === "asc") {
            return a.oldRaterBySalary - b.oldRaterBySalary;
          } else {
            return b.oldRaterBySalary - a.oldRaterBySalary;
          }
        case "salary":
          if (sortOrder === "asc") {
            return a.salary - b.salary;
          } else {
            return b.salary - a.salary;
          }
        case "gamesPlayed":
          if (sortOrder === "asc") {
            return a.gamesPlayed - b.gamesPlayed;
          } else {
            return b.gamesPlayed - a.gamesPlayed;
          }
        case "raterByGames":
          if (sortOrder === "asc") {
            return a.raterByGames - b.raterByGames;
          } else {
            return b.raterByGames - a.raterByGames;
          }
        default:
          return 0;
      }
    });
    setSortedPlayers(sortedPlayersList);
  };

  return (
    <main>
      <section>
        <h2>Statistiques avancées</h2>
        <table>
          <thead>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("name")}
            >
              Nom {sortColumn === "name" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("rater")}
            >
              Rater {sortColumn === "rater" ? columnIcon : null}
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
                  onClick={() => sortColumnByArgument("oldRater")}
                >
                  Ancien rater {sortColumn === "oldRater" ? columnIcon : null}
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
                  <td>{player.raters[2025].toFixed(2)}</td>
                  <td>{player.salary}</td>
                  <td>{player.raterBySalary.toFixed(2)}</td>
                  {isLocal && (
                    <>
                      <td>{player.raters[2024].toFixed(2)}</td>
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
