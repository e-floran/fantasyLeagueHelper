import { CSSProperties } from "react";
import { createStyles } from "../../utils/style";
import { merge } from "lodash";

const styles = createStyles<CSSProperties>()({
  button: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.5rem 1rem",
    fontSize: "1em",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    margin: "0.5rem",
    maxWidth: "15rem",
    maxHeight: "2.5rem",
    lineBreak: "auto",
    whiteSpace: "nowrap",
    transition: "all 0.5s",
  },
});

interface ButtonProps {
  buttonText: string;
  isDisabled?: boolean;
  onClickButton: () => void;
  customStyle?: CSSProperties;
}
export const CustomButton = ({
  buttonText,
  isDisabled,
  onClickButton,
  customStyle,
}: ButtonProps) => {
  return (
    <button
      style={merge(styles.button, customStyle)}
      disabled={isDisabled}
      onClick={onClickButton}
    >
      {buttonText}
    </button>
  );
};
