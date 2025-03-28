import { db } from "@/utils/db"; // PostgreSQL Drizzle connection
import { currentUser } from "@clerk/nextjs/server";
import { AlumniPost } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1️⃣ Get the logged-in user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Extract user details from Clerk
    const alumniName = `${user.firstName} ${user.lastName}`;
    const alumniEmail = user.emailAddresses[0].emailAddress;
    const alumniId = user.id; // Clerk User ID
    const role = user.publicMetadata?.role || "alumni"; // Default role

    // 3️⃣ Parse the request body (Fixing req.body issue)
    const body = await req.json();
    const { title, content, company, location, jobLink } = body;

    // 4️⃣ Insert data into PostgreSQL using Drizzle
    const newPost = await db.insert(AlumniPost).values({
      alumniName,
      alumniEmail,
      alumniId,
      role,
      title,
      content,
      company,
      location,
      jobLink,
      createdAt: new Date().toISOString(), // ✅ Use ISO timestamp format
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
