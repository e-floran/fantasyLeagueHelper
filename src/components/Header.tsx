import {
  CSSProperties,
  // Dispatch,
  ReactElement,
  // SetStateAction,
  useContext,
  useMemo,
} from "react";
import { createStyles, rootColors } from "../utils/style";
import { useNavigate } from "react-router-dom";
import { NavButton } from "./NavButton";
import GroupsIcon from "@mui/icons-material/Groups";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import GavelIcon from "@mui/icons-material/Gavel";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { DataContext } from "../context/DataContext";

// interface HeaderProps {
//   setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
// }

export const Header = (): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    header: {
      height: "5.5rem",
    },
    h1: {
      fontSize: "2rem",
      textAlign: "center",
      color: rootColors.primary,
      marginBottom: "0.5rem",
    },
    nav: {
      width: "100%",
      height: "2rem",
      padding: "0 0.5rem",
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-evenly",
    },
  });
  const { setSelectedKeepers, isReady, leagueName } = useContext(DataContext);

  const navButtonsProps = [
    { icon: GroupsIcon, navigateTo: "/teamDetails" },
    { icon: CompareArrowsIcon, navigateTo: "/trade" },
    { icon: LeaderboardIcon, navigateTo: "/teams" },
    // { icon: AssistWalkerIcon, navigateTo: "/injuries" },
    { icon: QueryStatsIcon, navigateTo: "/advanced" },
    // { icon: AutoStoriesIcon, navigateTo: "/history" },
    // { icon: GavelIcon, navigateTo: "/rules" },
  ];

  const navigate = useNavigate();

  const title = useMemo(() => {
    if (leagueName) {
      return leagueName + " helper";
    }
    return "ESPN Fantasy Helper";
  }, [leagueName]);

  return (
    <header style={styles.header}>
      <h1 style={styles.h1}>🏀 {title} 🏀</h1>
      {isReady && (
        <nav style={styles.nav}>
          {navButtonsProps.map((navButton, index) => (
            <NavButton
              buttonIcon={navButton.icon}
              onClickButton={() => {
                setSelectedKeepers([]);
                navigate(navButton.navigateTo);
              }}
              key={index}
            />
          ))}
        </nav>
      )}
    </header>
  );
};
