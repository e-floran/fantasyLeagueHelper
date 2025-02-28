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
        <h2>Unpickable players</h2>
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
        <p>Players injured until the end of the season are in red.</p>
      </section>
    </main>
  );
};
