import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";
import { useMemo, useState } from "react";
import { getNewSalariesByPlayerId, getTeamTotals } from "./utils/utils";
import playersWithBothRaters from "./assets/teams/playersWithBothRaters.json";
import { TeamDetailsData } from "./utils/types";

function App() {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const { teams } = playersWithBothRaters;

  const dataByTeamId = useMemo(() => {
    const dataMap = new Map<number, TeamDetailsData>();
    teams.forEach((team) => {
      const newSalariesByPlayerId = getNewSalariesByPlayerId(team);
      const teamData = getTeamTotals(
        team,
        newSalariesByPlayerId,
        selectedKeepers
      );
      dataMap.set(team.id, { newSalariesByPlayerId, totals: teamData, team });
    });
    return dataMap;
  }, [selectedKeepers, teams]);

  return (
    <>
      <Header setSelectedKeepers={setSelectedKeepers} />
      <Routes>
        <Route
          path="/"
          element={
            <TeamDetails
              selectedKeepers={selectedKeepers}
              activeTeamId={activeTeamId}
              setActiveTeamId={setActiveTeamId}
              setSelectedKeepers={setSelectedKeepers}
              dataByTeamId={dataByTeamId}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/teams"
          element={<TeamsSummary dataByTeamId={dataByTeamId} />}
        />
      </Routes>
    </>
  );
}

export default App;
