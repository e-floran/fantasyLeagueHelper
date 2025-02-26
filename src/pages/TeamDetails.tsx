import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { TeamDetailsData } from "../utils/types";
import { ButtonsGroup } from "../components/teamDetails/ButtonsGroup";
import { RosterTable } from "../components/teamDetails/RosterTable";
import { RosterStats } from "../components/teamDetails/RosterStats";
import { DataContext } from "../context/DataContext";

export interface DetailsProps {
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamDetails = (): ReactElement => {
  const {
    selectedKeepers,
    activeTeamId,
    setActiveTeamId,
    setSelectedKeepers,
    dataByTeamId,
  } = useContext(DataContext);
  const activeTeamData = useMemo(() => {
    return dataByTeamId.get(activeTeamId);
  }, [activeTeamId, dataByTeamId]);

  return (
    <main>
      <ButtonsGroup
        activeTeamId={activeTeamId}
        setActiveTeamId={setActiveTeamId}
        setSelectedKeepers={setSelectedKeepers}
        dataByTeamId={dataByTeamId}
      />
      {activeTeamData && (
        <RosterTable
          activeTeamData={activeTeamData}
          selectedKeepers={selectedKeepers}
          setSelectedKeepers={setSelectedKeepers}
        />
      )}
      {activeTeamData && <RosterStats activeTeamData={activeTeamData} />}
    </main>
  );
};
