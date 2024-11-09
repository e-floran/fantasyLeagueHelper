import { CSSProperties, useMemo } from "react";
import { buildHistoryMap } from "../utils/data";
import { createStyles } from "../utils/style";

export const History = () => {
  const styles = createStyles<CSSProperties>()({
    historyTable: {
      margin: "0 auto",
    },
  });

  const historyByOwnerId = buildHistoryMap();
  const tableContent = useMemo(() => {
    const ownersArray: {
      ownerName: string;
      seasons: number;
      totalPoints: number;
    }[] = [];
    historyByOwnerId.forEach((value) => {
      ownersArray.push({
        ownerName: value.ownerName,
        seasons: value.seasonsRakings.length,
        totalPoints: value.totalPoints,
      });
    });
    return ownersArray
      .sort((a, b) => {
        return b.totalPoints - a.totalPoints;
      })
      .map((owner) => {
        return (
          <tr key={owner.ownerName}>
            <td>{owner.ownerName}</td>
            <td>{owner.seasons}</td>
            <td>{owner.totalPoints}</td>
          </tr>
        );
      });
  }, [historyByOwnerId]);

  return (
    <main>
      <section>
        <h2>Classement historique</h2>
        <table style={styles.historyTable}>
          <thead>
            <tr>
              <th>Manager</th>
              <th>Saisons</th>
              <th>Total points*</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </section>
      <section>
        <p>
          * : Un point est attribué pour chaque place au classement (1 point
          pour la 14e place, 2 pour la 13e place...) plus 3 points bonus pour le
          podium et encore 5 points bonus pour le titre.
        </p>
      </section>
    </main>
  );
};
