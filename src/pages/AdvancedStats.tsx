import {
  CSSProperties,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import rosters from "../assets/teams/rosters.json";
import { Player, StatsCategories } from "../utils/types";
import { createStyles } from "../utils/style";
import { useSortColumns } from "../hooks/useSortColumns";
import { CustomCheckbox } from "../components/generic/CustomCheckbox";
import { CustomButton } from "../components/generic/CustomButton";

export interface PlayerWithAdvancedStats extends Player {
  raterBySalary: number;
  oldRaterBySalary: number;
  raterByGames: number;
}

export const AdvancedStats = (): ReactElement => {
  const [categoriesToOmit, setCategoriesToOmit] = useState<StatsCategories[]>(
    []
  );
  const [openFilters, setOpenFilters] = useState(false);

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

  const averageGamesPlayed = useMemo(() => {
    const gamesPlayed = rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => player.gamesPlayed);
    return gamesPlayed.reduce((a, b) => a + b) / gamesPlayed.length;
  }, []);

  const parsePlayerToAdvanced = useCallback(
    (player: Player): PlayerWithAdvancedStats => {
      let newCurrentRater = player.currentRater;
      let newPreviousRater = player.previousRater;
      if (categoriesToOmit.length) {
        categoriesToOmit.forEach((category) => {
          newCurrentRater -= player.categoriesRaters[category];
          newPreviousRater -= player.previousCategoriesRaters[category];
        });
      }
      return {
        ...player,
        currentRater: newCurrentRater,
        previousRater: newPreviousRater,
        raterBySalary: newCurrentRater / player.salary,
        oldRaterBySalary: player.previousRater / player.salary,
        raterByGames: player.gamesPlayed
          ? (newCurrentRater / player.gamesPlayed) * averageGamesPlayed
          : 0,
      };
    },
    [averageGamesPlayed, categoriesToOmit]
  );

  const flatPlayers = useMemo(() => {
    return rosters.teams
      .map((team) => team.roster)
      .flat()
      .map((player) => {
        return parsePlayerToAdvanced(player);
      });
  }, [parsePlayerToAdvanced]);

  const isLocal = location.hostname === "localhost";

  const { columnIcon, sortColumn, sortedOptions, sortColumnByArgument } =
    useSortColumns({ options: flatPlayers });

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
        <h2>Statistiques avancées</h2>
        <article style={styles.filtersContainer}>
          <CustomButton
            buttonText="Exclure"
            onClickButton={() => setOpenFilters(!openFilters)}
          />
          {openFilters &&
            (Object.keys(StatsCategories) as Array<StatsCategories>).map(
              (category) => (
                <CustomCheckbox
                  labelText={category}
                  onChange={() => handleCategoryToggle(category)}
                  isChecked={categoriesToOmit.includes(category)}
                  key={category}
                />
              )
            )}
        </article>
        <table>
          <thead>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("fullName")}
            >
              Nom {sortColumn === "fullName" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("currentRater")}
            >
              Rater {sortColumn === "currentRater" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("salary")}
            >
              Salaire {sortColumn === "salary" ? columnIcon : null}
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("raterBySalary")}
            >
              Rater/salaire {sortColumn === "raterBySalary" ? columnIcon : null}
            </th>
            {isLocal && (
              <>
                <th
                  style={styles.columnHeader}
                  onClick={() => sortColumnByArgument("previousRater")}
                >
                  Ancien rater{" "}
                  {sortColumn === "previousRater" ? columnIcon : null}
                </th>
                <th
                  style={styles.columnHeader}
                  onClick={() => sortColumnByArgument("oldRaterBySalary")}
                >
                  Ancien rater/salaire{" "}
                  {sortColumn === "oldRaterBySalary" ? columnIcon : null}
                </th>
              </>
            )}
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("gamesPlayed")}
            >
              Matchs joués
            </th>
            <th
              style={styles.columnHeader}
              onClick={() => sortColumnByArgument("raterByGames")}
            >
              Rater/matchs *
            </th>
          </thead>
          <tbody>
            {sortedOptions.map((player) => {
              return (
                <tr key={player.id}>
                  <td style={styles.tableCell}>{player.fullName}</td>
                  <td style={styles.tableCell}>
                    {player.currentRater.toFixed(2)}
                  </td>
                  <td style={styles.tableCell}>{player.salary}</td>
                  <td style={styles.tableCell}>
                    {player.raterBySalary.toFixed(2)}
                  </td>
                  {isLocal && (
                    <>
                      <td style={styles.tableCell}>
                        {player.previousRater.toFixed(2)}
                      </td>
                      <td style={styles.tableCell}>
                        {player.oldRaterBySalary.toFixed(2)}
                      </td>
                    </>
                  )}
                  <td style={styles.tableCell}>{player.gamesPlayed}</td>
                  <td style={styles.tableCell}>
                    {player.raterByGames.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <p>
          * : Les chiffres pour le rater par matchs joués sont multipliés par le
          nombre moyen de matchs joués, pour avoir des chiffres plus lisibles.
        </p>
      </section>
    </main>
  );
};
