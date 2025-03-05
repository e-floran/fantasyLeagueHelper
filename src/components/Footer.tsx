import { CSSProperties, ReactElement, useContext } from "react";
import { createStyles } from "../utils/style";
import { DataContext } from "../context/DataContext";

export const Footer = (): ReactElement => {
  const { lastUpdate } = useContext(DataContext);

  const styles = createStyles<CSSProperties>()({
    footer: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "1rem",
      width: "100%",
      fontSize: "0.75rem",
      height: "2.5rem",
    },
  });

  return (
    <footer style={styles.footer}>
      <a href="https://fantasy.espn.com/basketball/league?leagueId=3409">
        Fantasy league BBF
      </a>
      <p>Mise à jour des données : {lastUpdate.toLocaleString()}</p>
    </footer>
  );
};
