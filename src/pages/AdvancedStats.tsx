import { CSSProperties, ReactElement, useMemo, useState } from "react";
import rosters from "../assets/teams/rosters.json";
import { Player } from "../utils/types";
import { createStyles } from "../utils/style";

interface PlayerWithRaterBySalary extends Player {
  raterBySalary: number;
}

export const AdvancedStats = (): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    columnHeader: {
      cursor: "pointer",
    },
  });

  const flatPlayers = useMemo(() => {
    return rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => {
        return {
          ...player,
          raterBySalary: player.raters[2025] / player.salary,
        };
      });
  }, []);

  const [sortOrder, setSortOrder] = useState("desc");
  const [columnIcon, setColumnIcon] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortedPlayers, setSortedPlayers] =
    useState<PlayerWithRaterBySalary[]>(flatPlayers);

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
        case "raterBySalary":
          if (sortOrder === "asc") {
            return a.raterBySalary - b.raterBySalary;
          } else {
            return b.raterBySalary - a.raterBySalary;
          }
        case "salary":
          if (sortOrder === "asc") {
            return a.salary - b.salary;
          } else {
            return b.salary - a.salary;
          }
        default:
          return 0;
      }
    });
    setSortedPlayers(sortedPlayersList);
  };

  return (
    <main>
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
        </thead>
        <tbody>
          {sortedPlayers.map((player) => {
            return (
              <tr>
                <td>{player.fullName}</td>
                <td>{player.raters[2025]}</td>
                <td>{player.salary}</td>
                <td>{(player.raters[2025] / player.salary).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
