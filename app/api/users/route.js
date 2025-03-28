import { getAuth } from "@clerk/nextjs/server"; // ✅ Use getAuth() instead of auth()
import { db } from "@/utils/db"; // Drizzle ORM instance
import { Users } from "@/utils/schema"; // Users table

export async function POST(req) {
  try {
    console.log("Route calling start");

    // ✅ Get the auth token from request headers
    const { userId } = getAuth(req); // ✅ Correct way to get user ID
    console.log("Verified:", userId);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await req.json(); // Parse request body
    console.log("User data from body:", user);

    // ✅ Save user data in database
    await db.insert(Users).values({
      clerkUserId: userId,
      name: user.name || "Unknown",
      email: user.email || "No Email",
      role: user.role || "student",
      createdAt: new Date().toISOString(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
