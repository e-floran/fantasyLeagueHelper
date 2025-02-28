import { CSSProperties, ReactElement, useCallback, useState } from "react";
import { StatsCategories } from "../utils/types";
import { createStyles } from "../utils/style";
import { RaterFilters } from "../components/advancedStats/RaterFilters";
import { AdvancedTable } from "../components/advancedStats/AdvancedTable";

export const AdvancedStats = (): ReactElement => {
  const [categoriesToOmit, setCategoriesToOmit] = useState<StatsCategories[]>(
    []
  );

  const styles = createStyles<CSSProperties>()({
    columnHeader: {
      cursor: "pointer",
    },
    filtersContainer: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.25rem",
    },
    filtersTitle: {
      width: "fit-content",
    },
    tableCell: {
      maxWidth: "calc(100% / 9)",
    },
  });

  const handleCategoryToggle = useCallback(
    (category: StatsCategories) => {
      if (categoriesToOmit.includes(category)) {
        setCategoriesToOmit((prev) => prev.filter((cat) => cat !== category));
        return;
      }
      setCategoriesToOmit((prev) => [...prev, category]);
    },
    [categoriesToOmit]
  );

  return (
    <main>
      <section>
        <h2>Advanced stats</h2>
        <RaterFilters
          containerStyle={styles.filtersContainer}
          handleCategoryToggle={handleCategoryToggle}
          categoriesToOmit={categoriesToOmit}
        />
        <AdvancedTable
          headerStyle={styles.columnHeader}
          cellStyle={styles.tableCell}
          categoriesToOmit={categoriesToOmit}
        />
      </section>
    </main>
  );
};
