import { CSSProperties, ReactElement, useMemo } from "react";
import { createStyles } from "../../utils/style";
import { CustomButton } from "../generic/CustomButton";
import { DetailsProps } from "../../pages/TeamDetails";

export const ButtonsGroup = ({
  activeTeamId,
  setActiveTeamId,
  setSelectedKeepers,
  dataByTeamId,
}: Omit<DetailsProps, "selectedKeepers">): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    buttonsGroup: {
      marginBottom: "1.5rem",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "start",
      gap: "0.5rem",
    },
    h2: {
      width: "100%",
    },
    button: {
      width: "45%",
    },
  });

  const teamsIds = useMemo(() => {
    const ids = Array.from(dataByTeamId.keys());
    return ids;
  }, [dataByTeamId]);

  const buttons = useMemo(() => {
    const buttonsArray: ReactElement[] = [];
    teamsIds.forEach((teamId) => {
      const team = dataByTeamId.get(teamId)?.team;
      if (!team) {
        return;
      }
      buttonsArray.push(
        <CustomButton
          key={team.id}
          buttonText={team.name}
          isDisabled={activeTeamId === team.id}
          onClickButton={() => {
            setActiveTeamId(team.id);
            setSelectedKeepers([]);
          }}
          customStyle={styles.button}
        />
      );
    });
    return buttonsArray;
  }, [
    activeTeamId,
    dataByTeamId,
    setActiveTeamId,
    setSelectedKeepers,
    styles.button,
    teamsIds,
  ]);

  return (
    <section style={styles.buttonsGroup}>
      <h2 style={styles.h2}>Effectif</h2>
      {buttons}
    </section>
  );
};