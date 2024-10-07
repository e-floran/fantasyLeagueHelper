import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";
import { useMemo, useState } from "react";
import { getNewSalariesByPlayerId, getTeamTotals } from "./utils/utils";
import { TeamDetailsData } from "./utils/types";
import { InjuryReport } from "./pages/InjuryReport";
import rosters from "./assets/teams/rosters.json";

function App() {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const teams = rosters;

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
        <Route
          path="/teams"
          element={<TeamsSummary dataByTeamId={dataByTeamId} />}
        />
        <Route path="/injuries" element={<InjuryReport />} />
      </Routes>
    </>
  );
}

export default App;
