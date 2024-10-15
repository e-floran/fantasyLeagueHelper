import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createStyles } from "../../utils/style";
import { Player, TeamDetailsData } from "../../utils/types";
import { CustomButton } from "../generic/CustomButton";
import { parseNegativeValue } from "../../utils/utils";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface RosterTableProps {
  activeTeamData: TeamDetailsData;
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
}

export const RosterTable = ({
  activeTeamData,
  selectedKeepers,
  setSelectedKeepers,
}: RosterTableProps): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    section: {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    columnHeader: {
      cursor: "pointer",
    },
    injuredPlayer: {
      backgroundColor: "red",
    },
  });

  const [sortOrder, setSortOrder] = useState("asc");
  const [columnIcon, setColumnIcon] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>(
    activeTeamData.team.roster
  );

  const handleCheckboxClick = (playerId: number) => {
    if (selectedKeepers.includes(playerId)) {
      setSelectedKeepers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedKeepers.length < 6) {
      setSelectedKeepers((prev) => [...prev, playerId]);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setColumnIcon(columnIcon === "↑" ? "↓" : "↑");
  };

  const sortColumnByArgument = (column: string) => {
    toggleSortOrder();
    setSortColumn(column);
    const sortedPlayersList = [...(activeTeamData?.team.roster ?? [])].sort(
      (a, b) => {
        switch (column) {
          case "name":
            if (sortOrder === "asc") {
              return a.fullName.localeCompare(b.fullName);
            } else {
              return b.fullName.localeCompare(a.fullName);
            }
          // case "rater2025":
          //   if (sortOrder === "asc") {
          //     return a.raters[2025] - b.raters[2025];
          //   } else {
          //     return b.raters[2025] - a.raters[2025];
          //   }
          case "rater2024":
            if (sortOrder === "asc") {
              return a.raters[2024] - b.raters[2024];
            } else {
              return b.raters[2024] - a.raters[2024];
            }
          case "seasonsKeeper":
            if (sortOrder === "asc") {
              return a.keeperHistory.length - b.keeperHistory.length;
            } else {
              return b.keeperHistory.length - a.keeperHistory.length;
            }
          case "salary":
            if (sortOrder === "asc") {
              return a.salary - b.salary;
            } else {
              return b.salary - a.salary;
            }
          // case "newValue":
          //   if (sortOrder === "asc") {
          //     return (
          //       (activeTeamData?.newSalariesByPlayerId.get(a.id) ?? 0) -
          //       (activeTeamData?.newSalariesByPlayerId.get(b.id) ?? 0)
          //     );
          //   } else {
          //     return (
          //       (activeTeamData?.newSalariesByPlayerId.get(b.id) ?? 0) -
          //       (activeTeamData?.newSalariesByPlayerId.get(a.id) ?? 0)
          //     );
          //   }
          default:
            return 0;
        }
      }
    );
    setSortedPlayers(sortedPlayersList);
  };

  useEffect(() => {
    setSortColumn("");
    setSortedPlayers(activeTeamData?.team.roster);
  }, [activeTeamData]);

  return (
    <section style={styles.section}>
      <table>
        <thead>
          <tr>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("name")}
            >
              {"Nom"} {sortColumn === "name" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("rater2024")}
            >
              {"Rater 2024"} {sortColumn === "rater2024" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("rater2025")}
            >
              {"Rater 2025"} {sortColumn === "rater2025" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("seasonsKeeper")}
            >
              {"Saisons keeper"}{" "}
              {sortColumn === "seasonsKeeper" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("salary")}
            >
              Salaire {sortColumn === "salary" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("newValue")}
            >
              Nouvelle valeur {sortColumn === "newValue" ? columnIcon : null}
            </th>
            <th>Test keepers</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player) => {
            return (
              <tr key={player.id}>
                {player.injuredSpot ? (
                  <td style={{ position: "relative" }}>
                    <LocalHospitalIcon
                      sx={{
                        color: "red",
                        position: "absolute",
                        bottom: "0.25rem",
                        left: "0",
                      }}
                    />{" "}
                    {player.fullName}
                  </td>
                ) : (
                  <td>{player.fullName}</td>
                )}
                <td>{parseNegativeValue(player.raters[2024]).toFixed(2)}</td>
                <td>{player.raters[2025].toFixed(2)}</td>
                <td>{player.keeperHistory.length}</td>
                <td style={player.injuredSpot ? { color: "red" } : undefined}>
                  {player.salary}
                </td>
                <td>{activeTeamData?.newSalariesByPlayerId.get(player.id)}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedKeepers.includes(player.id)}
                    onChange={() => handleCheckboxClick(player.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Totaux</td>
            <td>{activeTeamData?.totals?.rater2024.toFixed(2)}</td>
            <td>{activeTeamData?.totals?.rater2025.toFixed(2)}</td>
            <td>-</td>
            <td>{activeTeamData?.totals?.currentSalary}</td>
            <td>{activeTeamData?.totals?.projectedSalary}</td>
            <td>{activeTeamData?.totals?.projectedKeepersSalaries}</td>
          </tr>
        </tfoot>
      </table>
      {!!selectedKeepers.length && (
        <CustomButton
          buttonText="Vider les keepers"
          onClickButton={() => setSelectedKeepers([])}
        />
      )}
    </section>
  );
};
