import { TradeTool } from "../components/trade/TradeTool";
import { TeamDetailsData } from "../utils/types";

export interface SummaryProps {
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const Trade = ({ dataByTeamId }: SummaryProps) => {
  return (
    <main>
      <TradeTool dataByTeamId={dataByTeamId} />
    </main>
  );
};
