import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TeamDetails } from "./pages/TeamDetails";
import { Header } from "./components/Header";
import { TeamsSummary } from "./pages/TeamsSummary";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TeamDetails />} />
      </Routes>
      <Routes>
        <Route path="/teams" element={<TeamsSummary />} />
      </Routes>
    </>
  );
}

export default App;
