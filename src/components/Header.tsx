import { CSSProperties, ReactElement } from "react";
// import { NavLink } from "react-router-dom";
import { createStyles, rootColors } from "../utils/style";

const styles = createStyles<CSSProperties>()({
  header: {
    marginBottom: "1rem",
  },
  h1: {
    fontSize: "2rem",
    textAlign: "center",
    color: rootColors.primary,
  },
});

export const Header = (): ReactElement => {
  return (
    <header style={styles.header}>
      <h1 style={styles.h1}>Assistant Fantasy league</h1>
      <p style={{ textAlign: "center" }}>(site en cours de réalisation)</p>
      {/* <nav>
        <NavLink to="/home">Accueil</NavLink>
      </nav> */}
    </header>
  );
};
