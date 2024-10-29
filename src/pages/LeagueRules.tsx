import { ReactElement } from "react";
import { CSSProperties } from "react";
import { createStyles } from "../utils/style";
import rulesText from "../assets/rules/rulesText.json";

export const LeagueRules = (): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    rulesSection: {
      width: "100%",
    },
    rulesText: {
      width: "100%",
      textAlign: "justify",
      marginBottom: "0.25rem",
    },
  });

  const renderParagraphs = (paragraphs: string[]) => {
    return paragraphs.map((paragraph) => {
      return <p style={styles.rulesText}>{paragraph}</p>;
    });
  };

  const renderSection = () => {
    return rulesText.map((section) => {
      return (
        <section style={styles.rulesSection}>
          <h2>{section.title}</h2>
          {renderParagraphs(section.paragraphs)}
        </section>
      );
    });
  };

  return <main>{renderSection()}</main>;
};
