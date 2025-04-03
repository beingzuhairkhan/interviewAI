import { db } from "@/utils/db";
import { ranking } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    console.log("🔹 Fetching rankings for user:", userId);

    const userRankings = await db
    .select({
      week: sql`EXTRACT(WEEK FROM ${ranking.createdAt}::TIMESTAMP)`.as("week"), 
      score: ranking.totalScore,
    })
    .from(ranking)
    .where(eq(ranking.clerkUserId, userId))
    .orderBy(sql`week`);

    console.log(" Retrieved rankings:", userRankings);

    return NextResponse.json(userRankings);
  } catch (error) {
    console.error(" Error fetching rankings:", error);
    return NextResponse.json({ error: "Failed to fetch rankings", details: error.message }, { status: 500 });
  }
}
