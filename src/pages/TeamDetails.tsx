import { CSSProperties, ReactElement, useMemo, useState } from "react";
import playersWithBothRaters from "../assets/teams/playersWithBothRaters.json";
import { computeNewSalary, parseNegativeValue } from "../utils/utils";
import { createStyles } from "../utils/style";
import { CustomButton } from "../components/generic/CustomButton";

const styles = createStyles<CSSProperties>()({
  buttonsGroup: {
    marginBottom: "1.5rem",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "start",
  },
  button: {
    width: "45%",
  },
});

export const TeamDetails = (): ReactElement => {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const { teams } = playersWithBothRaters;
  const activeTeam = useMemo(() => {
    return teams.find((team) => team.id === activeTeamId);
  }, [activeTeamId, teams]);

  const newSalariesByPlayerId = useMemo(() => {
    const salariesMap = new Map<number, number>();
    activeTeam?.roster.forEach((player) => {
      salariesMap.set(
        player.id,
        parseNegativeValue(
          computeNewSalary(
            player.keeperValue,
            player.keeperHistory.length,
            player.raters[2023] === 0,
            player.raters[2024] - parseNegativeValue(player.raters[2023])
          ),
          1
        )
      );
    });
    return salariesMap;
  }, [activeTeam?.roster]);

  const totalProjectedSalary = useMemo(() => {
    const salaries: number[] = [];
    newSalariesByPlayerId.forEach((value) => {
      salaries.push(value);
    });
    if (!salaries.length) {
      return 0;
    }
    return salaries.reduce((partialSum, a) => partialSum + a, 0);
  }, [newSalariesByPlayerId]);

  const keepersSalaries = useMemo(() => {
    const salaries: number[] = [];
    if (!selectedKeepers || selectedKeepers.length === 0) {
      return 0;
    }
    selectedKeepers.forEach((id) => {
      const value = newSalariesByPlayerId.get(id);
      if (value) {
        salaries.push(value);
      }
    });
    if (salaries.length === 0) {
      return 0;
    }
    return salaries.reduce((partialSum, a) => partialSum + a, 0);
  }, [newSalariesByPlayerId, selectedKeepers]);

  const totals = useMemo(() => {
    if (!activeTeam) {
      return undefined;
    }
    const rater2023 = activeTeam.roster
      .map((player) => player.raters[2023])
      .reduce((partialSum, a) => partialSum + a, 0);
    const rater2024 = activeTeam.roster
      .map((player) => player.raters[2024])
      .reduce((partialSum, a) => partialSum + a, 0);
    const currentSalary = activeTeam.roster
      .map((player) => player.keeperValue)
      .reduce((partialSum, a) => partialSum + a, 0);

    return {
      rater2023,
      rater2024,
      currentSalary,
      projectedSalary: totalProjectedSalary,
      projectedKeepersSalaries: keepersSalaries,
    };
  }, [activeTeam, keepersSalaries, totalProjectedSalary]);

  const handleCheckboxClick = (playerId: number) => {
    if (selectedKeepers.includes(playerId)) {
      setSelectedKeepers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedKeepers.length < 6) {
      setSelectedKeepers((prev) => [...prev, playerId]);
    }
  };

  return (
    <main>
      <div style={styles.buttonsGroup}>
        {teams.map((team) => (
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
        ))}
      </div>
      {activeTeam && (
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
            {activeTeam?.roster.map((player) => {
              return (
                <tr>
                  <td>{player.fullName}</td>
                  <td>{player.raters[2023].toFixed(2)}</td>
                  <td>{player.raters[2024].toFixed(2)}</td>
                  <td>{player.keeperHistory.length}</td>
                  <td>{player.keeperValue}</td>
                  <td>{newSalariesByPlayerId.get(player.id)}</td>
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
              <td>{totals?.rater2023.toFixed(2)}</td>
              <td>{totals?.rater2024.toFixed(2)}</td>
              <td>-</td>
              <td>{totals?.currentSalary}</td>
              <td>{totals?.projectedSalary}</td>
              <td>{totals?.projectedKeepersSalaries}</td>
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
