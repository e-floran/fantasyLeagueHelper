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
          <td>{value.totals.projectedSalary}</td>
        </tr>
      );
      rows.push(row);
    });
    return rows;
  }, [dataByTeamId]);

  return (
    <table>
      <thead>
        <tr>
          <th>Équipe</th>
          <th>Salaires actuels</th>
          <th>Marge actuelle</th>
          <th>Salaires à venir</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};
