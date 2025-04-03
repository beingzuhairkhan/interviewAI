
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    console.log(" API Request received at /api/atsResume");

 
    const jobDescription = "Looking for a MERN stack developer with React and Node.js.";
    console.log(" Job Description:", jobDescription);

    // ✅ Read Resume File
    const resumePath = path.join(process.cwd(), "public", "zuhair_.pdf"); 

    if (!fs.existsSync(resumePath)) {
      console.error(" Resume file not found at:", resumePath);
      return NextResponse.json({ error: "Resume file not found." }, { status: 404 });
    }

    const resumeBuffer = fs.readFileSync(resumePath);
    console.log(" Resume Buffer Size:", resumeBuffer.length);

    // ✅ Parse PDF to extract text
    const resumeData = await pdfParse(resumeBuffer);
    console.log(" Extracted Resume Text:", resumeData.text.substring(0, 500));

    return NextResponse.json({
    resumeData
    });
  } catch (error) {
    console.error(" Error processing resume:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
