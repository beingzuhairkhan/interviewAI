import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import pdfParse from "pdf-parse";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    console.log(" Request received at /api/resumeats");

    
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    console.log(" Received form data:", { resumeFile, jobDescription });

    //  Validate input
    if (!resumeFile || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and Job Description are required" },
        { status: 400 }
      );
    }

    //  Convert file to buffer
    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    //  Parse PDF text
    let resumeText = "";
    try {
      const parsedData = await pdfParse(buffer);
      resumeText = parsedData.text;
      console.log(" Extracted Resume Text:", resumeText.substring(0, 500)); 
    } catch (error) {
      console.error("PDF Parsing Error:", error.message);
      return NextResponse.json({ error: "Failed to parse PDF file." }, { status: 500 });
    }

    //  AI Prompt for Resume Scoring
    const prompt = `
    Analyze the following resume and compare it with the given job description. Assign an ATS score (0-100) based on keyword relevance, formatting, readability, and completeness. Also, provide missing skills and improvement suggestions.

    Job Description:
    ${jobDescription}

    Resume:
    ${resumeText}

    Return the response in **valid JSON format** like this:
    {
      "atsScore": 85,
      "missingSkills": ["React.js", "GraphQL"],
      "formattingSuggestions": ["Use bullet points for clarity"],
      "readabilityImprovements": ["Reduce long paragraphs"]
    }`;

    console.log(" Sending Prompt to Groq API:", prompt);

  
    const aiResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    console.log("🔹 Raw Groq API Response:", aiResponse);

  
    let responseText = aiResponse.choices?.[0]?.message?.content?.trim();
    if (!responseText) {
      throw new Error("Groq AI did not return valid JSON.");
    }

    responseText = responseText.replace(/```json|```/g, "").trim();

    console.log(" Processed AI Response:", responseText);

  
    const parsedResponse = JSON.parse(responseText);

    return NextResponse.json("API IS WORKING", { status: 200 });
  } catch (error) {
    console.error(" ATS API Error:", error.message || error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
