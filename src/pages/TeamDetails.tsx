import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
} from "react";
import { createStyles } from "../utils/style";
import { CustomButton } from "../components/generic/CustomButton";
import { TeamDetailsData } from "../utils/types";

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
    return <div style={styles.buttonsGroup}>{buttons}</div>;
  }, [
    activeTeamId,
    setActiveTeamId,
    setSelectedKeepers,
    dataByTeamId,
    teamsIds,
  ]);

  return (
    <main>
      {teamsButtons}
      {activeTeamData && (
        <>
          <table>
            <thead>
              <tr>
                <th>{"Nom"}</th>
                <th>{"Rater 2023"}</th>
                <th>{"Rater 2024"}</th>
                <th>{"Saisons keeper"}</th>
                <th>Valeur 2024</th>
                <th>Nouvelle valeur</th>
                <th>Test keepers</th>
              </tr>
            </thead>
            {activeTeamData?.team.roster.map((player) => {
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
            <tr>
              <td>Totaux</td>
              <td>{activeTeamData?.totals?.rater2023.toFixed(2)}</td>
              <td>{activeTeamData?.totals?.rater2024.toFixed(2)}</td>
              <td>-</td>
              <td>{activeTeamData?.totals?.currentSalary}</td>
              <td>{activeTeamData?.totals?.projectedSalary}</td>
              <td>{activeTeamData?.totals?.projectedKeepersSalaries}</td>
            </tr>
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
