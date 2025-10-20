import { NextResponse } from "next/server";
import { Team, UnpickablePlayer } from "../../../src/utils/types";
import rosters from "../../../src/assets/teams/rosters.json";

export interface RostersResponse {
  teams: Team[];
  unpickablePlayers: UnpickablePlayer[];
  lastUpdate: string;
}

export async function GET() {
  try {
    const data: RostersResponse = {
      teams: rosters.teams as Team[],
      unpickablePlayers: rosters.unpickablePlayers as UnpickablePlayer[],
      lastUpdate: rosters.lastUpdate,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading rosters:", error);
    return NextResponse.json(
      { error: "Failed to load rosters" },
      { status: 500 }
    );
  }
}
