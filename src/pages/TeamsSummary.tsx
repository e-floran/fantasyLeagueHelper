import { SummaryTable } from "../components/teamsSummary/SummaryTable";
import { TradeTool } from "../components/teamsSummary/TradeTool";
import { TeamDetailsData } from "../utils/types";

export interface SummaryProps {
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamsSummary = ({ dataByTeamId }: SummaryProps) => {
  return (
    <main>
      <SummaryTable dataByTeamId={dataByTeamId} />
      <TradeTool dataByTeamId={dataByTeamId} />
    </main>
  );
};
