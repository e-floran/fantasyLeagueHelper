import { ReactElement } from "react";
import { UnpickablePlayer } from "../utils/types";

export const InjuryReport = ({
  injuredPlayers,
}: {
  injuredPlayers: UnpickablePlayer[];
}): ReactElement => {
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
              <tr key={player.id}>
                <td style={player.outForSeason ? { color: "red" } : undefined}>
                  {player.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Les joueurs blessés jusqu'à la fin de la saison sont en rouge.</p>
      </section>
    </main>
  );
};
