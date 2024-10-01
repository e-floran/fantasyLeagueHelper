import { ReactElement, useMemo, useState } from "react";
import playersWithBothRaters from "../assets/teams/playersWithBothRaters.json";
import { computeNewSalary, parseNegativeValue } from "../utils/utils";

export const TeamDetails = (): ReactElement => {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const { teams } = playersWithBothRaters;
  const activeTeam = useMemo(() => {
    return teams.find((team) => team.id === activeTeamId);
  }, [activeTeamId, teams]);

  const totalSalary = useMemo(() => {
    const salaries = activeTeam?.roster.map((player) => player.keeperValue);
    if (!salaries) {
      return 0;
    }
    return salaries.reduce((partialSum, a) => partialSum + a, 0);
  }, [activeTeam?.roster]);

  const keepersSalaries = useMemo(() => {
    const salaries = activeTeam?.roster
      .filter((player) => selectedKeepers.includes(player.id))
      .map((player) => player.keeperValue);
    if (!salaries) {
      return 0;
    }
    return salaries.reduce((partialSum, a) => partialSum + a, 0);
  }, [activeTeam?.roster, selectedKeepers]);

  const handleCheckboxClick = (playerId: number) => {
    if (selectedKeepers.includes(playerId)) {
      setSelectedKeepers((prev) => prev.filter((id) => id !== playerId));
    } else {
      setSelectedKeepers((prev) => [...prev, playerId]);
    }
  };

  return (
    <main>
      <div className="buttonsGroup">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => {
              setActiveTeamId(team.id);
              setSelectedKeepers([]);
            }}
            disabled={activeTeamId === team.id}
          >
            {team.name}
          </button>
        ))}
      </div>
      {activeTeam && (
        <>
          {" "}
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
                  <td>
                    {parseNegativeValue(
                      computeNewSalary(
                        player.keeperValue,
                        player.keeperHistory.length,
                        player.raters[2023] === 0,
                        player.raters[2024] -
                          parseNegativeValue(player.raters[2023])
                      ),
                      1
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedKeepers.includes(player.id)}
                      onClick={() => handleCheckboxClick(player.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          <div>
            <p>Total salaires : {totalSalary}$</p>
            {!!selectedKeepers.length && (
              <>
                <p>Salaires des keepers potentiels : {keepersSalaries}$</p>
                <button onClick={() => setSelectedKeepers([])}>
                  Déselectionner les keepers
                </button>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
};
