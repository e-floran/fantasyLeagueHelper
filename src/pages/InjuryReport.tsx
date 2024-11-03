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
            {injuredPlayers
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};
