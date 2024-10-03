import { CSSProperties, ReactElement, useState } from "react";
import { SummaryProps } from "../../pages/TeamsSummary";
import { createStyles } from "../../utils/style";
import { TradeTeam } from "./TradeTeam";

export const TradeTool = ({ dataByTeamId }: SummaryProps): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    section: {
      width: "100%",
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      marginTop: "3rem",
    },
  });

  const [firstTeam, setFirstTeam] = useState<number>(0);
  const [secondTeam, setSecondTeam] = useState<number>(0);

  return (
    <section style={styles.section}>
      <TradeTeam
        dataByTeamId={dataByTeamId}
        setTeam={setFirstTeam}
        teamId={firstTeam}
      />
      <TradeTeam
        dataByTeamId={dataByTeamId}
        setTeam={setSecondTeam}
        teamId={secondTeam}
      />
    </section>
  );
};
