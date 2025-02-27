import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";
// import { useMemo, useState } from "react";
// import { getNewSalariesByPlayerId, getTeamTotals } from "./utils/utils";
// import { TeamDetailsData } from "./utils/types";
// import { InjuryReport } from "./pages/InjuryReport";
// import rosters from "./assets/teams/rosters.json";
// import rostersNew from "./assets/teams/rostersNew.json";
import { Footer } from "./components/Footer";
import { Trade } from "./pages/Trade";
// import { dailyUpdate } from "./scripts/dailyUpdate";
// import { CustomButton } from "./components/generic/CustomButton";
// import { LeagueRules } from "./pages/LeagueRules";
import { AdvancedStats } from "./pages/AdvancedStats";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { DataProvider } from "./context/DataContext";

function App() {
  // const [activeTeamId, setActiveTeamId] = useState(0);
  // const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  // const { teams } = rosters;

  // const dataByTeamId = useMemo(() => {
  //   const dataMap = new Map<number, TeamDetailsData>();
  //   teams.forEach((team) => {
  //     const newSalariesByPlayerId = getNewSalariesByPlayerId(team);
  //     const teamData = getTeamTotals(
  //       team,
  //       newSalariesByPlayerId,
  //       selectedKeepers
  //     );
  //     dataMap.set(team.id, { newSalariesByPlayerId, totals: teamData, team });
  //   });
  //   return dataMap;
  // }, [selectedKeepers, teams]);

  // const isLocal = location.hostname === "localhost";

  return (
    <DataProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
          <Route path="/teams" element={<TeamsSummary />} />
          <Route path="/trade" element={<Trade />} />
          {/* <Route
          path="/injuries"
          element={<InjuryReport injuredPlayers={unpickablePlayers} />}
        /> */}
          {/* <Route path="/rules" element={<LeagueRules />} /> */}
          <Route path="/advanced" element={<AdvancedStats />} />
          {/* <Route path="/history" element={<History />} /> */}
        </Routes>
        {/* {isLocal && (
        <CustomButton buttonText="Mettre à jour" onClickButton={dailyUpdate} />
      )} */}
        <Footer />
      </>
    </DataProvider>
  );
}

export default App;
