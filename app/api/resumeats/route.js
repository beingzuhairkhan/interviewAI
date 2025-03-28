import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";
import * as fs from 'fs';

// ✅ Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    // ✅ Get form data

    const pdfFile = fs.readFileSync('../../../public/zuhair_.pdf')
    let resumeText = "";
    console.log(resumeText)
    try {
      const parsedData = await pdfParse(pdfFile);
      resumeText = parsedData.text;
    } catch (error) {
      console.error(" PDF Parsing Error:", error.message);
      return NextResponse.json(
        { error: "Failed to parse PDF file." },
        { status: 500 }
      );
    }

 
    const prompt = `Analyze the following resume and compare it with the given job description. Assign an ATS score (0-100) based on keyword relevance, formatting, readability, and completeness. Also, provide missing skills and improvement suggestions.

    Job Description:
    MERN stack

    Resume:
    ${resumeText}

    Return the response in **valid JSON format** like this:
    {
      "atsScore": 85,
      "missingSkills": ["React.js", "GraphQL"],
      "formattingSuggestions": ["Use bullet points for clarity"],
      "readabilityImprovements": ["Reduce long paragraphs"]
    }`;

    // ✅ Generate content using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Extract JSON response
    const responseText = await result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Gemini API did not return valid JSON.");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

  
    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    // ✅ Handle errors
    console.error("❌ ATS API Error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}