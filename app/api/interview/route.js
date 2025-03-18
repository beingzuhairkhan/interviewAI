import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function POST(req) {
  try {
    const { jsonMockResponse, jobPosition, jobDescription, jobExp, createdBy } = await req.json();

    const dbresponse = await db
      .insert(Interview)
      .values({
        mockId: uuidv4(),
        jsonMockResponse,
        jobPosition,
        jobDescription,
        jobExp,
        createdBy,
        createdAt: moment().format("YYYY-MM-DD"),
      })
      .returning({ mockId: Interview.mockId });

    return NextResponse.json({ success: true, mockId: dbresponse[0].mockId });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
