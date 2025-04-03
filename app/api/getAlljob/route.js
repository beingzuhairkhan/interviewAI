import { db } from "@/utils/db"; // PostgreSQL Drizzle connection
import { AlumniPost } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await db.select().from(AlumniPost).orderBy(AlumniPost.createdAt);
   // console.log("JObs" , jobs)
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

