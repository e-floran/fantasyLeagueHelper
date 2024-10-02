import { CSSProperties } from "react";
import { createStyles, mergeStyles } from "../../utils/style";

const styles = createStyles<CSSProperties>()({
  button: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.5rem 1rem",
    fontSize: "1em",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "border-color 0.25s",
    margin: "0.5rem",
    maxWidth: "15rem",
    maxHeight: "2.5rem",
    lineBreak: "auto",
    whiteSpace: "nowrap",
  },
});

interface ButtonProps {
  buttonText: string;
  isDisabled?: boolean;
  buttonKey: string;
  onClickButton: () => void;
  customStyle?: CSSProperties;
}
export const CustomButton = ({
  buttonText,
  isDisabled,
  buttonKey,
  onClickButton,
  customStyle,
}: ButtonProps) => {
  return (
    <button
      style={mergeStyles(styles.button, customStyle)}
      key={buttonKey}
      disabled={isDisabled}
      onClick={onClickButton}
    >
      {buttonText}
    </button>
  );
};
