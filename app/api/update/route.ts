import { NextResponse } from "next/server";
import { dailyUpdate } from "../../../src/scripts/dailyUpdate";

export async function POST() {
  try {
    // Create a mock setter for server-side execution
    const mockSetIsUpdating = (value: boolean) => {
      console.log(`Update status: ${value}`);
    };

    // Execute the daily update
    await dailyUpdate(mockSetIsUpdating);

    return NextResponse.json({ success: true, message: "Update completed" });
  } catch (error) {
    console.error("Daily update failed:", error);
    return NextResponse.json(
      {
        error: "Daily update failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
