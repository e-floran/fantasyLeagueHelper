import { ReactElement } from "react";

export const InjuryReport = (): ReactElement => {
  const injuredPlayers = [
    {
      name: "Saddiq Bey",
    },
    { name: "Devin Carter" },
    { name: "DanteExum" },
    { name: "DaRon Holmes" },
    { name: "GG Jackson" },
    { name: "Kristaps Porzingis" },
    { name: "Mitchell Robinson" },
    { name: "Nikola Topic" },
  ];
  return (
    <main>
      <h2>Joueurs blessés à ne pas drafter/pick</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {injuredPlayers.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
