import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";
import { InjuryReport } from "./pages/InjuryReport";
import { Footer } from "./components/Footer";
import { Trade } from "./pages/Trade";
import { dailyUpdate } from "./scripts/dailyUpdate";
import { CustomButton } from "./components/generic/CustomButton";
import { LeagueRules } from "./pages/LeagueRules";
import { AdvancedStats } from "./pages/AdvancedStats";
import { History } from "./pages/History";
import { DataProvider } from "./context/DataContext";

function App() {
  const isLocal = location.hostname === "localhost";

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
        {isLocal && (
          <CustomButton
            buttonText="Mettre à jour"
            onClickButton={dailyUpdate}
          />
        )}
        <Footer />
      </>
    </DataProvider>
  );
}

export default App;
