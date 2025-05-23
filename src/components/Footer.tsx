import { CSSProperties, ReactElement, useContext } from "react";
import { createStyles } from "../utils/style";
import { DataContext } from "../context/DataContext";
import { NavButton } from "./NavButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { dailyUpdate } from "../scripts/dailyUpdate";

export const Footer = (): ReactElement => {
  const { lastUpdate, handleDataRefresh, setIsUpdating } =
    useContext(DataContext);
  const isLocal = location.hostname === "localhost";

  const styles = createStyles<CSSProperties>()({
    footer: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "1rem",
      width: "100%",
      fontSize: "0.75rem",
    },
    updateContainer: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
    },
  });

  return (
    <footer style={styles.footer}>
      {isLocal && (
        <NavButton
          buttonIcon={SystemUpdateAltIcon}
          onClickButton={() => dailyUpdate(setIsUpdating)}
        />
      )}
      <a href="https://fantasy.espn.com/basketball/league?leagueId=3409">
        Fantasy league BBF
      </a>
      <article style={styles.updateContainer}>
        <p>Mise à jour des données : {lastUpdate.toLocaleString()}</p>
        <NavButton
          buttonIcon={AutorenewIcon}
          onClickButton={() => dailyUpdate(setIsUpdating, handleDataRefresh)}
        />
      </article>
    </footer>
  );
};
