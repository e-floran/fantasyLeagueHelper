import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { getDataByTeamId } from "../utils/utils";
import { Team, TeamDetailsData } from "../utils/types";
import { leagueInit } from "../scripts/leagueInit";
import { useNavigate } from "react-router-dom";

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
  isReady: boolean;
}

export const DataContext = createContext<ContextData>({} as ContextData);

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  const [leagueId, setLeagueId] = useState("3409");
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const dataByTeamId = useMemo(() => {
    return getDataByTeamId(teams, selectedKeepers);
  }, [selectedKeepers, teams]);

  const handleLeagueIdChange = async (newId: string) => {
    setLeagueId(newId);
    await leagueInit(newId, setTeams).then(() => {
      navigate(`/teamDetails`);
    });
  };

  const isReady = useMemo(() => {
    return !!teams.length;
  }, [teams.length]);

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
        isReady,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
