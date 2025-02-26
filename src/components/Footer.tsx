import { CSSProperties, ReactElement, useContext } from "react";
import { createStyles } from "../utils/style";
// import rosters from "../assets/teams/rosters.json";
import { DataContext } from "../context/DataContext";

// interface FooterProps {
//   lastUpdate: Date;
// }
export const Footer = (): ReactElement => {
  const { leagueId } = useContext(DataContext);
  // const lastUpdate = useMemo(() => {
  //   return new Date(rosters.lastUpdate);
  // }, []);
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
      <a
        href={`https://fantasy.espn.com/basketball/league?leagueId=${leagueId}`}
      >
        Your ESPN Fantasy league
      </a>
      {/* <p>Mise à jour des données : {lastUpdate.toLocaleString()}</p> */}
    </footer>
  );
};
