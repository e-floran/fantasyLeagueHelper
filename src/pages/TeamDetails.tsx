import { Dispatch, ReactElement, SetStateAction, useMemo } from "react";
import { TeamDetailsData } from "../utils/types";
import { ButtonsGroup } from "../components/teamDetails/ButtonsGroup";
import { RosterTable } from "../components/teamDetails/RosterTable";
import { RosterStats } from "../components/teamDetails/RosterStats";

export interface DetailsProps {
  selectedKeepers: number[];
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
  activeTeamId: number;
  setActiveTeamId: Dispatch<SetStateAction<number>>;
  dataByTeamId: Map<number, TeamDetailsData>;
}

export const TeamDetails = ({
  selectedKeepers,
  activeTeamId,
  setActiveTeamId,
  setSelectedKeepers,
  dataByTeamId,
}: DetailsProps): ReactElement => {
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
