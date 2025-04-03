import { db } from "@/utils/db"; 
import { currentUser } from "@clerk/nextjs/server";
import { AlumniPost } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
 
    const user = await currentUser();
   // console.log("User server" , user)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alumniName = `${user.firstName} ${user.lastName}`;
    const alumniEmail = user.emailAddresses[0].emailAddress;
    const alumniId = user.id; 
    const imageURL = user.imageUrl
    const role = user.publicMetadata?.role || "alumni"; 

   
    const body = await req.json();
    const { title, content, company, location, jobLink } = body;

    
    const newPost = await db.insert(AlumniPost).values({
      alumniName,
      alumniEmail,
      imageURL,
      alumniId,
      role,
      title,
      content,
      company,
      location,
      jobLink,
      createdAt: new Date().toISOString(), 
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
