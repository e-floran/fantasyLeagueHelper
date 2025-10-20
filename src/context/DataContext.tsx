import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getDataByTeamId } from "../utils/utils";
import { Team, TeamDetailsData, UnpickablePlayer } from "../utils/types";

interface ContextData {
  teams: Team[];
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  dataByTeamId: Map<number, TeamDetailsData>;
  unpickablePlayers: UnpickablePlayer[];
  lastUpdate: Date;
  handleDataRefresh: (
    newTeams: Team[],
    newUnpickables: UnpickablePlayer[],
    newUpdate: Date
  ) => void;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export const DataContext = createContext<ContextData>({} as ContextData);

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [unpickablePlayers, setUnpickablePlayers] = useState<
    UnpickablePlayer[]
  >([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/rosters");
        if (!response.ok) {
          throw new Error("Failed to fetch rosters");
        }
        const data = await response.json();
        setTeams(data.teams);
        setUnpickablePlayers(data.unpickablePlayers);
        setLastUpdate(new Date(data.lastUpdate));
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback to empty state or handle error as needed
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const dataByTeamId = useMemo(() => {
    return getDataByTeamId(teams, selectedKeepers);
  }, [selectedKeepers, teams]);

  const handleDataRefresh = useCallback(
    (newTeams: Team[], newUnpickables: UnpickablePlayer[], newUpdate: Date) => {
      setTeams(newTeams);
      setUnpickablePlayers(newUnpickables);
      setLastUpdate(newUpdate);
      setIsUpdating(false);
    },
    []
  );

  return (
    <DataContext.Provider
      value={{
        teams,
        activeTeamId,
        setActiveTeamId,
        selectedKeepers,
        setSelectedKeepers,
        dataByTeamId,
        unpickablePlayers,
        lastUpdate,
        handleDataRefresh,
        isUpdating,
        setIsUpdating,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
