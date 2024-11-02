import { Team } from "./types";

export const parseNegativeValue = (value: number, limit?: number): number => {
  const trueLimit = limit ?? 0;
  return value < trueLimit ? trueLimit : value;
};

export const computeNewSalary = (
  salary: number,
  keeperHistory: number,
  omitDelta: boolean,
  raterDelta: number
) => {
  const valueWithKeeps =
    keeperHistory >= 2 ? salary + (keeperHistory - 1) * 5 : salary;
  if (!raterDelta || omitDelta) {
    return valueWithKeeps;
  }
  if (raterDelta < -3) {
    return valueWithKeeps - 5;
  } else if (raterDelta < -2.5) {
    return valueWithKeeps - 4;
  } else if (raterDelta < -2) {
    return valueWithKeeps - 3;
  } else if (raterDelta < -1.5) {
    return valueWithKeeps - 2;
  } else if (raterDelta < -1) {
    return valueWithKeeps - 1;
  } else if (raterDelta < -0.5) {
    return valueWithKeeps;
  } else if (raterDelta < 0.5) {
    return valueWithKeeps + 1;
  } else if (raterDelta < 1.5) {
    return valueWithKeeps + 2;
  } else if (raterDelta < 2) {
    return valueWithKeeps + 3;
  } else if (raterDelta < 3) {
    return valueWithKeeps + 4;
  } else {
    return valueWithKeeps + 5;
  }
};

export const getNewSalariesByPlayerId = (team?: Team) => {
  const salariesMap = new Map<number, number>();
  team?.roster.forEach((player) => {
    salariesMap.set(
      player.id,
      parseNegativeValue(
        computeNewSalary(
          player.salary,
          player.keeperHistory.length,
          player.previousRater === 0,
          player.currentRater - parseNegativeValue(player.previousRater)
        ),
        1
      )
    );
  });
  return salariesMap;
};

const getTeamTotalProjectedSalary = (
  newSalariesByPlayerId: Map<number, number>
) => {
  const salaries: number[] = [];
  newSalariesByPlayerId.forEach((value) => {
    salaries.push(value);
  });
  if (!salaries.length) {
    return 0;
  }
  return salaries.reduce((partialSum, a) => partialSum + a, 0);
};

const getTeamKeepersSalaries = (
  newSalariesByPlayerId: Map<number, number>,
  keepers?: number[]
) => {
  const salaries: number[] = [];
  if (!keepers || keepers.length === 0) {
    return 0;
  }
  keepers.forEach((id) => {
    const value = newSalariesByPlayerId.get(id);
    if (value) {
      salaries.push(value);
    }
  });
  if (salaries.length === 0) {
    return 0;
  }
  return salaries.reduce((partialSum, a) => partialSum + a, 0);
};

export const getTeamTotals = (
  team: Team,
  newSalariesByPlayerId: Map<number, number>,
  keepers: number[]
) => {
  const rater2024 = team.roster
    .map((player) => player.previousRater)
    .reduce((partialSum, a) => partialSum + a, 0);
  const rater2025 = team.roster
    .map((player) => player.currentRater)
    .reduce((partialSum, a) => partialSum + a, 0);
  const currentSalary = team.roster
    .filter((player) => !player.injuredSpot)
    .map((player) => player.salary)
    .reduce((partialSum, a) => partialSum + a, 0);

  const projectedSalary = getTeamTotalProjectedSalary(newSalariesByPlayerId);
  const projectedKeepersSalaries = getTeamKeepersSalaries(
    newSalariesByPlayerId,
    keepers
  );

  return {
    rater2025,
    rater2024,
    currentSalary,
    projectedSalary,
    projectedKeepersSalaries,
  };
};
