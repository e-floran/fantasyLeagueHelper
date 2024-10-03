import { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react";
import { createStyles, rootColors } from "../utils/style";
import { useNavigate } from "react-router-dom";
import { NavButton } from "./NavButton";
import GroupsIcon from "@mui/icons-material/Groups";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

interface HeaderProps {
  setSelectedKeepers: Dispatch<SetStateAction<number[]>>;
}

export const Header = ({ setSelectedKeepers }: HeaderProps): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    header: {
      marginBottom: "1rem",
    },
    h1: {
      fontSize: "2rem",
      textAlign: "center",
      color: rootColors.primary,
    },
    nav: {
      width: "100%",
      height: "2rem",
      position: "fixed",
      top: "0.75rem",
      left: "0",
      padding: "0 0.5rem",
      display: "flex",
      justifyContent: window.location.pathname === "/" ? "end" : "start",
    },
  });

  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <h1 style={styles.h1}>🏀 Fantasy league BBF 🏀</h1>
      <nav style={styles.nav}>
        <NavButton
          buttonIcon={
            window.location.pathname === "/" ? CompareArrowsIcon : GroupsIcon
          }
          onClickButton={() => {
            setSelectedKeepers([]);
            navigate(window.location.pathname === "/" ? "/teams" : "/");
          }}
        />
      </nav>
    </header>
  );
};
