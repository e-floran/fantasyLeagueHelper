import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import rosters from "../assets/teams/rosters.json";

interface ContextData {
  leagueId?: string;
  setLeagueId?: Dispatch<SetStateAction<string>>;
  teams?: (typeof rosters)["teams"];
}

export const DataContext = createContext<ContextData>({});

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [leagueId, setLeagueId] = useState("");
  const { teams } = rosters;

  return (
    <DataContext.Provider value={{ leagueId, setLeagueId, teams }}>
      {children}
    </DataContext.Provider>
  );
};
