import { CSSProperties } from "react";
import { createStyles } from "../../utils/style";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

interface CheckboxProps {
  labelText: string;
  isChecked: boolean;
  onChange: () => void;
}
export const CustomCheckbox = ({
  labelText,
  isChecked,
  onChange,
}: CheckboxProps) => {
  const styles = createStyles<CSSProperties>()({
    label: {
      display: "block",
      cursor: "pointer",
      userSelect: "none",
      paddingLeft: "2rem",
      position: "relative",
      overflow: "hidden",
      minWidth: "4rem",
    },
    checkbox: {
      opacity: 0,
      cursor: "pointer",
      position: "absolute",
    },
    icon: {
      position: "absolute",
      fontSize: "1.25rem",
      left: 0,
    },
  });

  return (
    <label style={styles.label}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        style={styles.checkbox}
      />
      {isChecked ? (
        <CheckBoxIcon style={styles.icon} />
      ) : (
        <CheckBoxOutlineBlankIcon style={styles.icon} />
      )}
      {labelText}
    </label>
  );
};
