import { NextResponse } from "next/server";
import rater2024 from "../../../../src/assets/rater/rater2024.json";

export async function GET() {
  try {
    return NextResponse.json(rater2024);
  } catch (error) {
    console.error("Error loading rater data:", error);
    return NextResponse.json(
      { error: "Failed to load rater data" },
      { status: 500 }
    );
  }
}
