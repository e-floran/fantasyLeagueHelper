import { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react";
import { createStyles } from "../../utils/style";
import { TeamDetailsData } from "../../utils/types";
import { CustomButton } from "../generic/CustomButton";
import { parseNegativeValue } from "../../utils/utils";
import { useSortColumns } from "../../hooks/useSortColumns";

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
      position: "relative",
      top: "0.25rem",
    },
  });

  const handleCheckboxClick = (playerId: number) => {
    if (selectedKeepers.includes(playerId)) {
      setSelectedKeepers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedKeepers.length < 6) {
      setSelectedKeepers((prev) => [...prev, playerId]);
    }
  };

  const { columnIcon, sortColumn, sortedPlayers, sortColumnByArgument } =
    useSortColumns({ players: activeTeamData.team.roster });

  return (
    <section style={styles.section}>
      <table>
        <thead>
          <tr>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("fullName")}
            >
              {"Nom"} {sortColumn === "fullName" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("previousRater")}
            >
              {"Rater 2024"}{" "}
              {sortColumn === "previousRater" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("currentRater")}
            >
              {"Rater 2025"} {sortColumn === "currentRater" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("keeperHistory")}
            >
              {"Saisons keeper"}
              {sortColumn === "keeperHistory" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("salary")}
            >
              Salaire {sortColumn === "salary" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              // onClick={() => sortColumnByArgument("newValue")}
            >
              {/* Saison prochaine {sortColumn === "newValue" ? columnIcon : null} */}
              Saison prochaine
            </th>
            <th>Test keepers</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player) => {
            return (
              <tr
                style={player.injuredSpot ? { color: "red" } : undefined}
                key={player.id}
              >
                <td>{player.fullName}</td>
                <td>{parseNegativeValue(player.previousRater).toFixed(2)}</td>
                <td>{player.currentRater.toFixed(2)}</td>
                <td>{player.keeperHistory.length}</td>
                <td>{player.salary}</td>
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
