import { SummaryTable } from "../components/teamsSummary/SummaryTable";
import { TeamDetailsData } from "../utils/types";

export interface SummaryProps {
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamsSummary = ({ dataByTeamId }: SummaryProps) => {
  return (
    <main>
      <SummaryTable dataByTeamId={dataByTeamId} />
    </main>
  );
};
