import { CSSProperties } from "react";
import { createStyles } from "../utils/style";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface ButtonProps {
  buttonIcon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  isDisabled?: boolean;
  onClickButton: () => void;
}
export const NavButton = ({
  buttonIcon,
  isDisabled,
  onClickButton,
}: ButtonProps) => {
  const styles = createStyles<CSSProperties>()({
    button: {
      borderRadius: "1.25rem",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      width: "2rem",
      height: "2rem",
      transition: "all 0.5s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const NavIcon = buttonIcon;

  return (
    <button style={styles.button} disabled={isDisabled} onClick={onClickButton}>
      <NavIcon />
    </button>
  );
};
