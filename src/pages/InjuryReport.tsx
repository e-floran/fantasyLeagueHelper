import { ReactElement } from "react";

export const InjuryReport = (): ReactElement => {
  const injuredPlayers = [
    {
      name: "Saddiq Bey",
    },
    { name: "Devin Carter" },
    { name: "Dante Exum" },
    { name: "DaRon Holmes", outForSeason: true },
    { name: "GG Jackson" },
    { name: "Kristaps Porzingis" },
    { name: "Mitchell Robinson" },
    { name: "Nikola Topic" },
    { name: "Emoni Bates" },
    { name: "James Wiseman", outForSeason: true },
    { name: "Precious Achiuwa" },
    { name: "Bojan Bogdanovic" },
    { name: "Robert Williams" },
    { name: "Isaiah Hartenstein" },
    { name: "Kawhi Leonard" },
    { name: "Dejounte Murray" },
    { name: "Max Strus" },
    { name: "PJ Tucker" },
  ];
  return (
    <main>
      <section>
        <h2>Joueurs blessés à ne pas drafter/pick</h2>
        <table style={{ width: "100%" }}>
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
      </section>
    </main>
  );
};
