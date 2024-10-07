export interface OldPlayer {
  id: number;
  fullName: string;
  keeperValue: number;
  keeperHistory: string[];
  raters: {
    "2023": number;
    "2024": number;
  };
}

export interface Player {
  id: number;
  fullName: string;
  salary: number;
  keeperHistory: string[];
  raters: {
    "2025": number;
    "2024": number;
  };
}

export interface Team {
  id: number;
  name: string;
  roster: Player[];
}

export interface TeamDetailsData {
  team: Team;
  newSalariesByPlayerId: Map<number, number>;
  totals: {
    rater2025: number;
    rater2024: number;
    currentSalary: number;
    projectedSalary: number;
    projectedKeepersSalaries: number;
  };
}
