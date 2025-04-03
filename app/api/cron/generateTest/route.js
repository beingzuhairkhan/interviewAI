import { db } from "@/utils/db";
import { test } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import Groq from "groq-sdk";

// ✅ Initialize Groq API Client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const topics = [
  "MERN Stack", "Frontend", "Backend", "Full Stack Developer", "AI/ML", "Data Science",
  "UX/UI", "DevOps", "Product Management", "Project Management", "Technical Writing",
  "Leadership", "Networking", "Career Advancement", "Marketing", "Sales", "Copywriting",
  "Public Speaking", "Resume/CV Writing", "Technical Interview", "Behavioral Interview"
];

export async function POST() {
  try {
   
    const currentWeek = Math.floor((Date.now() / 1000 / 60 / 60 / 24 / 7) % topics.length);
    const topic = topics[currentWeek];

    const existingTest = await db.select().from(test).where(eq(test.weekNumber, currentWeek));
    if (existingTest.length > 0) {
      return NextResponse.json(existingTest[0], { status: 200 });
    }

    // ✅ AI Prompt for generating test
    const prompt = `Generate 20 multiple-choice questions for ${topic} in pure JSON format (no extra text). 
    The JSON format should be:
    {
      "questions": [
        { "question": "What is React?", "options": ["A", "B", "C", "D"], "answer": "A" }
      ]
    }`;

  
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

let responseText = chatCompletion.choices[0]?.message?.content?.trim();

//console.log("🔹 Groq API Raw Response:", responseText);


responseText = responseText.replace(/```json|```/g, "").trim();

let parsedQuestions;
try {
  parsedQuestions = JSON.parse(responseText);
} catch (jsonError) {
  console.error(" JSON Parsing Error:", jsonError.message);
  return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
}

if (!parsedQuestions.questions || !Array.isArray(parsedQuestions.questions)) {
  return NextResponse.json({ error: "Invalid question format" }, { status: 500 });
}



    await db.insert(test).values({
      weekNumber: currentWeek,
      topic,
      questions: JSON.stringify(parsedQuestions.questions),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: `Test for ${topic} created!` }, { status: 201 });
  } catch (error) {
    console.error(" Test Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate test" }, { status: 500 });
  }
}
