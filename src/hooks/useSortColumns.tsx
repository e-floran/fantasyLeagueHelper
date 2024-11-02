/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PlayerWithAdvancedStats } from "../pages/AdvancedStats";
import { Player } from "../utils/types";

export const useSortColumns = ({ players }: { players: any[] }) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [columnIcon, setColumnIcon] = useState("");
  const [sortColumn, setSortColumn] = useState<
    keyof PlayerWithAdvancedStats | keyof Player
  >("fullName");
  const [sortedPlayers, setSortedPlayers] = useState<any[]>(players);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setColumnIcon(columnIcon === "↓" ? "↑" : "↓");
  };

  const sortColumnByArgument = (
    column: keyof PlayerWithAdvancedStats | keyof Player
  ) => {
    toggleSortOrder();
    setSortColumn(column);
    const sortedPlayersList = [...(players ?? [])].sort((a, b) => {
      if (typeof a[column] === "string" && typeof b[column] === "string") {
        if (sortOrder === "asc") {
          return a[column].localeCompare(b[column]);
        } else {
          return b[column].localeCompare(a[column]);
        }
      } else if (
        typeof a[column] === "number" &&
        typeof b[column] === "number"
      ) {
        if (sortOrder === "asc") {
          return a[column] - b[column];
        } else {
          return b[column] - a[column];
        }
      } else if (Array.isArray(a[column]) && Array.isArray(b[column])) {
        if (sortOrder === "asc") {
          return a[column].length - b[column].length;
        } else {
          return b[column].length - a[column].length;
        }
      } else {
        return 0;
      }
    });
    setSortedPlayers(sortedPlayersList);
  };

  useEffect(() => {
    setSortColumn("fullName");
    setSortedPlayers(players);
  }, [players]);

  return {
    sortOrder,
    setSortOrder,
    columnIcon,
    setColumnIcon,
    sortColumn,
    setSortColumn,
    sortedPlayers,
    setSortedPlayers,
    toggleSortOrder,
    sortColumnByArgument,
  };
};
