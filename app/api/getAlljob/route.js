import { db } from "@/utils/db"; // PostgreSQL Drizzle connection
import { AlumniPost } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Fetching job posts...");

    // Fetch all job posts
    const allJobPost = await db.select().from(AlumniPost);

    console.log("Fetched Job Posts:", allJobPost);

    // Return data
    return NextResponse.json(allJobPost, { status: 200 });
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}


     // Get user details
      // const user = await currentUser();
      // if (!user) {
      //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      // }
  
      // // Extract user email
      // const userEmail = user.emailAddresses[0].emailAddress;
  
      // Fetch jobs created by this user using Drizzle's eq function
      // const userPosts = await db
      //   .select()
      //   .from(AlumniPost)
      //   .where(eq(AlumniPost.alumniEmail, userEmail)); // ✅ Corrected filtering method
