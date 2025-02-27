import { CSSProperties, ReactElement, useContext } from "react";
import { createStyles } from "../utils/style";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";

export const Footer = (): ReactElement => {
  const { leagueId, leagueName, isReady } = useContext(DataContext);
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
      {leagueName && isReady && (
        <a
          href={`https://fantasy.espn.com/basketball/league?leagueId=${leagueId}`}
        >
          {leagueName} on ESPN
        </a>
      )}
      {leagueName && isReady && <Link to={"/"}>Change league</Link>}
    </footer>
  );
};
