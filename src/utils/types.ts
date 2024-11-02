export enum AcquisitionTypeEnum {
  DRAFT = "DRAFT",
  ADD = "ADD",
  TRADE = "TRADE",
}

export interface Player {
  id: number;
  fullName: string;
  salary: number;
  keeperHistory: string[];
  previousRater: number;
  currentRater: number;
  injuredSpot: boolean;
  gamesPlayed: number;
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

export interface RatedRawPlayer {
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  onteamId: number;
  ratings: {
    "0": {
      totalRating: number;
    };
  };
  player: {
    fullName: string;
    id: number;
    stats: { id: string; stats: { "42": number } }[];
    injured: boolean;
  };
}

export interface RawPlayer {
  lineupSlotId: number;
  playerId: number;
  acquisitionType: AcquisitionTypeEnum;
  playerPoolEntry: Omit<RatedRawPlayer, "ratings">;
}

export interface RawTeam {
  id: number;
  name: string;
  roster: { entries: RawPlayer[] };
}

export interface UnpickablePlayer {
  name: string;
  id: number;
  outForSeason?: boolean | undefined;
}
