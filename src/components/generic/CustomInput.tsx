import { CSSProperties, Dispatch, SetStateAction } from "react";
import { createStyles } from "../../utils/style";

interface ButtonProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
}
export const CustomInput = ({ value, onChange, placeholder }: ButtonProps) => {
  const styles = createStyles<CSSProperties>()({
    input: {
      borderRadius: "0.75rem",
      border: "1px solid transparent",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      fontFamily: "inherit",
      width: "15rem",
      margin: "0.2rem",
    },
  });

  return (
    <input
      type="text"
      style={styles.input}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder={placeholder}
    />
  );
};
