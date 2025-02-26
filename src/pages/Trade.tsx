import { useContext } from "react";
import { TradeTool } from "../components/trade/TradeTool";
import { TeamDetailsData } from "../utils/types";
import { DataContext } from "../context/DataContext";

export interface SummaryProps {
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const Trade = () => {
  const { dataByTeamId } = useContext(DataContext);
  return (
    <main>
      <TradeTool dataByTeamId={dataByTeamId} />
    </main>
  );
};
