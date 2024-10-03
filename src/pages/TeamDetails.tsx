import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createStyles } from "../utils/style";
import { CustomButton } from "../components/generic/CustomButton";
import { Player, TeamDetailsData } from "../utils/types";

const styles = createStyles<CSSProperties>()({
  buttonsGroup: {
    marginBottom: "1.5rem",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "0.5rem",
  },
  button: {
    width: "45%",
  },
  columnHeader: {
    cursor: 'pointer',
  }
});

interface DetailsProps {
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamDetails = ({
  selectedKeepers,
  activeTeamId,
  setActiveTeamId,
  setSelectedKeepers,
  dataByTeamId,
}: DetailsProps): ReactElement => {
  const handleCheckboxClick = (playerId: number) => {
    if (selectedKeepers.includes(playerId)) {
      setSelectedKeepers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedKeepers.length < 6) {
      setSelectedKeepers((prev) => [...prev, playerId]);
    }
  };

  const teamsIds = useMemo(() => {
    const ids = Array.from(dataByTeamId.keys());
    return ids;
  }, [dataByTeamId]);
  
  const [sortedPlayers, setSortedPlayers] = useState<Player[] | undefined>(undefined);

  const activeTeamData = useMemo(() => {
    return dataByTeamId.get(activeTeamId);
  }, [activeTeamId, dataByTeamId]);

  const teamsButtons = useMemo<ReactElement>(() => {
    const buttons: ReactElement[] = [];
    teamsIds.forEach((teamId) => {
      const team = dataByTeamId.get(teamId)?.team;
      if (!team) {
        return;
      }
      buttons.push(
        <CustomButton
          key={team.id}
          buttonText={team.name}
          isDisabled={activeTeamId === team.id}
          onClickButton={() => {
            setActiveTeamId(team.id);
            setSelectedKeepers([]);
          }}
          customStyle={styles.button}
        />
      );
    });
    return <section style={styles.buttonsGroup}>{buttons}</section>;
  }, [
    activeTeamId,
    setActiveTeamId,
    setSelectedKeepers,
    dataByTeamId,
    teamsIds,
  ]);

  const [sortColumn, setSortColumn] = useState('');
  const [columnIcon, setColumnIcon] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setColumnIcon(columnIcon === '↑' ? '↓' : '↑');
  };

  const sortColumnByArgument = (column: string) => {
    toggleSortOrder();
    setSortColumn(column);
    const sortedPlayersList = [...(activeTeamData?.team.roster ?? [])].sort((a, b) => {
      switch (column) {
        case 'name':
          if (sortOrder === 'asc') {
            return a.fullName.localeCompare(b.fullName)
          } else {
            return b.fullName.localeCompare(a.fullName)
          }
        case 'rater2023':
          if (sortOrder === 'asc') {
            return a.raters[2023] - b.raters[2023]
          } else {
            return b.raters[2023] - a.raters[2023]
          }
        case 'rater2024':
          if (sortOrder === 'asc') {
            return a.raters[2024] - b.raters[2024]
          } else {
            return b.raters[2024] - a.raters[2024]
          }
        case 'seasonsKeeper':
          if (sortOrder === 'asc') {
            return a.keeperHistory.length - b.keeperHistory.length
          } else {
            return b.keeperHistory.length - a.keeperHistory.length
          }
          case 'keeperValue':
            if (sortOrder === 'asc') {
              return a.keeperValue - b.keeperValue
            } else {
              return b.keeperValue - a.keeperValue
            }
          case 'newValue':
            if (sortOrder === 'asc') {
              return (activeTeamData?.newSalariesByPlayerId.get(a.id) ?? 0) - 
                    (activeTeamData?.newSalariesByPlayerId.get(b.id) ?? 0);
            } else {
              return (activeTeamData?.newSalariesByPlayerId.get(b.id) ?? 0) - 
                    (activeTeamData?.newSalariesByPlayerId.get(a.id) ?? 0);
            }
        default:
          return 0;
      }
    });
    setSortedPlayers(sortedPlayersList);
  };

  useEffect(() => {
    setSortedPlayers(activeTeamData?.team.roster)
  },[activeTeamData])

  return (
    <main>
      {teamsButtons}
      {activeTeamData && sortedPlayers && (
        <>
          <table>
            <thead>
              <tr>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("name")}>{"Nom"} {sortColumn === "name" ? columnIcon : null}</th>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("rater2023")}>{"Rater 2023"} {sortColumn === "rater2023" ? columnIcon : null}</th>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("rater2024")}>{"Rater 2024"} {sortColumn === "rater2024" ? columnIcon : null}</th>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("seasonsKeeper")}>{"Saisons keeper"} {sortColumn === "seasonsKeeper" ? columnIcon : null}</th>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("keeperValue")}>Valeur 2024 {sortColumn === "keeperValue" ? columnIcon : null}</th>
                <th style={styles.columnHeader} onClick={() => sortColumnByArgument("newValue")}>Nouvelle valeur {sortColumn === "newValue" ? columnIcon : null}</th>
                <th>Test keepers</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player) => {
                return (
                 <tr>
                    <td>{player.fullName}</td>
                    <td>{player.raters[2023].toFixed(2)}</td>
                    <td>{player.raters[2024].toFixed(2)}</td>
                    <td>{player.keeperHistory.length}</td>
                    <td>{player.keeperValue}</td>
                    <td>
                      {activeTeamData?.newSalariesByPlayerId.get(player.id)}
                    </td>
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
                <td>{activeTeamData?.totals?.rater2023.toFixed(2)}</td>
                <td>{activeTeamData?.totals?.rater2024.toFixed(2)}</td>
                <td>-</td>
                <td>{activeTeamData?.totals?.currentSalary}</td>
                <td>{activeTeamData?.totals?.projectedSalary}</td>
                <td>{activeTeamData?.totals?.projectedKeepersSalaries}</td>
              </tr>
            </tfoot>
          </table>
          {!!selectedKeepers.length && (
            <button onClick={() => setSelectedKeepers([])}>
              Déselectionner les keepers
            </button>
          )}
        </>
      )} 
    </main>
  );
};
