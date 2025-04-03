import { getAuth } from "@clerk/nextjs/server"; // ✅ Use getAuth() instead of auth()
import { db } from "@/utils/db"; // Drizzle ORM instance
import { Users } from "@/utils/schema"; // Users table

export async function POST(req) {
  try {
    console.log("Route calling start");


    const { userId } = getAuth(req); 
    console.log("Verified:", userId);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await req.json(); 
    console.log("User data from body:", user);

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
