import { CSSProperties } from "react";
import { cloneDeep } from "lodash";

export const createStyles =
  <TValue>() =>
  <T extends Record<PropertyKey, TValue>>(v: T): T =>
    v;

export const rootColors = {
  primary: "#e45e04",
  background: "#242424",
  fontColor: "#ffeede",
  componentBackground: "#030100",
};

export const mergeStyles = (
  firstStyle: CSSProperties,
  secondStyle?: CSSProperties
): CSSProperties => {
  if (!secondStyle) {
    return firstStyle;
  }
  const outputStyle = cloneDeep(firstStyle);
  for (const [key, value] of Object.entries(secondStyle)) {
    outputStyle[key] = value;
  }
  return outputStyle;
};
