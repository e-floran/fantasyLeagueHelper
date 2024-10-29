import { ReactElement, useMemo } from "react";
import { SummaryProps } from "../../pages/TeamsSummary";

export const SummaryTable = ({ dataByTeamId }: SummaryProps): ReactElement => {
  const tableContent = useMemo(() => {
    const rows: ReactElement[] = [];
    dataByTeamId.forEach((value) => {
      const row = (
        <tr key={value.team.id}>
          <td>{value.team.name}</td>
          <td>{value.totals.currentSalary}</td>
          <td>{220 - value.totals.currentSalary}</td>
          <td>{value.totals.rater2024.toFixed(2)}</td>
          <td>{value.totals.rater2025.toFixed(2)}</td>
        </tr>
      );
      rows.push(row);
    });
    return rows;
  }, [dataByTeamId]);

  return (
    <section>
      <h2>Masses salariales</h2>
      <table>
        <thead>
          <tr>
            <th>Équipe</th>
            <th>Salaires</th>
            <th>Marge</th>
            <th>PR passé</th>
            <th>PR actuel</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </section>
  );
};
