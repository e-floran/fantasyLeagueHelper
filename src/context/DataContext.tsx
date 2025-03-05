import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { getDataByTeamId } from "../utils/utils";
import { Team, TeamDetailsData, UnpickablePlayer } from "../utils/types";
import rosters from "../assets/teams/rosters.json";

interface ContextData {
  teams: Team[];
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  dataByTeamId: Map<number, TeamDetailsData>;
  unpickablePlayers: UnpickablePlayer[];
  lastUpdate: Date;
}

export const DataContext = createContext<ContextData>({} as ContextData);

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [activeTeamId, setActiveTeamId] = useState(0);
  const [selectedKeepers, setSelectedKeepers] = useState<number[]>([]);
  const { teams, unpickablePlayers, lastUpdate } = rosters;

  const dataByTeamId = useMemo(() => {
    return getDataByTeamId(teams, selectedKeepers);
  }, [selectedKeepers, teams]);

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
        lastUpdate: new Date(lastUpdate),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
