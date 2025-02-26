import { useContext } from "react";
import { SummaryTable } from "../components/teamsSummary/SummaryTable";
import { TeamDetailsData } from "../utils/types";
import { DataContext } from "../context/DataContext";

export interface SummaryProps {
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamsSummary = () => {
  const { dataByTeamId } = useContext(DataContext);
  return (
    <main>
      <SummaryTable dataByTeamId={dataByTeamId} />
    </main>
  );
};
