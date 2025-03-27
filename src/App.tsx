import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";
import { InjuryReport } from "./pages/InjuryReport";
import { Footer } from "./components/Footer";
import { Trade } from "./pages/Trade";
import { LeagueRules } from "./pages/LeagueRules";
import { AdvancedStats } from "./pages/AdvancedStats";
import { History } from "./pages/History";
import { DataProvider } from "./context/DataContext";
import { Updater } from "./components/Updater";
// import { getLastSeasonRaters } from "./scripts/getLastSeasonRaters";

function App() {
  return (
    <DataProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<TeamDetails />} />
          <Route path="/teams" element={<TeamsSummary />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/injuries" element={<InjuryReport />} />
          <Route path="/rules" element={<LeagueRules />} />
          <Route path="/advanced" element={<AdvancedStats />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Footer />
        <Updater />
      </>
    </DataProvider>
  );
}

export default App;
