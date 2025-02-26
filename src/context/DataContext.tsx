import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import rosters from "../assets/teams/rosters.json";
import { getDataByTeamId } from "../utils/utils";
import { Team, TeamDetailsData } from "../utils/types";

interface ContextData {
  leagueId: string;
  handleLeagueIdChange: (newId: string) => void;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const DataContext = createContext<ContextData>({} as ContextData);

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [leagueId, setLeagueId] = useState("3409");
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const [teams, setTeams] = useState(rosters.teams);
  const dataByTeamId = useMemo(() => {
    return getDataByTeamId(teams, selectedKeepers);
  }, [selectedKeepers, teams]);

  const handleLeagueIdChange = (newId: string) => {
    setLeagueId(newId);
  };

  return (
    <DataContext.Provider
      value={{
        leagueId,
        handleLeagueIdChange,
        teams,
        setTeams,
        activeTeamId,
        setActiveTeamId,
        selectedKeepers,
        setSelectedKeepers,
        dataByTeamId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
