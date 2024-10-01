import { useMemo, useState } from "react";
import "./App.css";
// import { add2024RaterValue } from "./utils/utils";
// import { cleanRosters } from "./utils/utils.ts";
// import { getKeeperHistory } from "./utils/utils.ts";
// import { add2023RaterValue } from "./utils/utils";
import playersWithBothRaters from "./assets/teams/playersWithBothRaters.json";

function App() {
  // const cleanPlayers = () => {
  //   // const cleanedRosters = cleanRosters();
  //   // const addedHistory = getKeeperHistory();
  //   // const added2024 = add2024RaterValue();
  //   const added2023 = add2023RaterValue();
  //   const element = document.createElement("a");
  //   const textFile = new Blob([JSON.stringify(added2023)], {
  //     type: "application/json",
  //   });
  //   element.href = URL.createObjectURL(textFile);
  //   element.download = "playersWithBothRaters.json";
  //   document.body.appendChild(element);
  //   element.click();
  // };
  const [activeTeamId, setActiveTeamId] = useState(0);
  const { teams } = playersWithBothRaters;
  const activeTeam = useMemo(() => {
    return teams.find((team) => team.id === activeTeamId);
  }, [activeTeamId, teams]);

  const parseNegativeValue = (value: number, limit?: number): number => {
    const trueLimit = limit ?? 0;
    return value < trueLimit ? trueLimit : value;
  };

  const computeNewSalary = (
    keeperValue: number,
    keeperHistory: number,
    omitDelta: boolean,
    raterDelta: number
  ) => {
    const valueWithKeeps =
      keeperHistory >= 2 ? keeperValue + (keeperHistory - 1) * 5 : keeperValue;
    if (!raterDelta || omitDelta) {
      return valueWithKeeps;
    }
    if (raterDelta < -3) {
      return valueWithKeeps - 5;
    } else if (raterDelta < -2.5) {
      return valueWithKeeps - 4;
    } else if (raterDelta < -2) {
      return valueWithKeeps - 3;
    } else if (raterDelta < -1.5) {
      return valueWithKeeps - 2;
    } else if (raterDelta < -1) {
      return valueWithKeeps - 1;
    } else if (raterDelta < -0.5) {
      return valueWithKeeps;
    } else if (raterDelta < 0.5) {
      return valueWithKeeps + 1;
    } else if (raterDelta < 1.5) {
      return valueWithKeeps + 2;
    } else if (raterDelta < 2) {
      return valueWithKeeps + 3;
    } else if (raterDelta < 3) {
      return valueWithKeeps + 4;
    } else {
      return valueWithKeeps + 5;
    }
  };

  return (
    <main>
      <h1>Fantasy league BBF</h1>
      <p>(site en cours de réalisation)</p>
      {/* <button onClick={cleanPlayers}>générer</button> */}
      <div className="buttonsGroup">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeamId(team.id)}
            disabled={activeTeamId === team.id}
          >
            {team.name}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>{"Nom"}</th>
            <th>{"Rater 2023"}</th>
            <th>{"Rater 2024"}</th>
            <th>{"Saisons keeper"}</th>
            <th>Valeur 2024</th>
            <th>Nouvelle valeur</th>
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
            </tr>
          );
        })}
      </table>
    </main>
  );
}

export default App;
