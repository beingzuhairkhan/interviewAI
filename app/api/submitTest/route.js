import { NextResponse } from "next/server";
import { db } from "@/utils/db"; // Adjust the import based on your DB setup
import { submission, ranking } from "@/utils/schema"; // Import your tables
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const clerkUserId = user.id;
        const userName = user?.firstName + " " + user?.lastName ;
        const email = user?.emailAddresses[0].emailAddress;
        const body = await req.json();
        const {testId ,  submittedAnswers } = body;
        console.log("testId" ,testId, submittedAnswers , clerkUserId)
        
        if (!testId || !submittedAnswers || !clerkUserId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const getAnswerIndex = (correctAnswer) => {
            const answerMap = { A: 0, B: 1, C: 2, D: 3 }; 
            return answerMap[correctAnswer]; 
          };
          
          const getUserAnswerIndex = (userAnswer, options) => {
            return options.indexOf(userAnswer); 
          };
          
          // Calculate score
          let score = 0;
          submittedAnswers.forEach((answer) => {
            const correctAnswerIndex = getAnswerIndex(answer.correctAnswer); 
            const userAnswerIndex = getUserAnswerIndex(answer.userAnswer, answer.options); 
            
            if (userAnswerIndex === correctAnswerIndex) {
              score += 1; 
            }
          });



        await db.insert(submission).values({
            clerkUserId,
            userName,
            email,
            testId,
            score,
            createdAt: new Date().toISOString(),
        });


        const existingRanking = await db
            .select()
            .from(ranking)
            .where(eq(ranking.clerkUserId, clerkUserId))
            .then((res) => res[0]);

        if (existingRanking) {
            await db
                .update(ranking)
                .set({ totalScore: existingRanking.totalScore + score })
                .where(eq(ranking.clerkUserId, clerkUserId));
        } else {
            await db.insert(ranking).values({
                userName,
                email,
                clerkUserId,
                totalScore: score,
                createdAt: new Date().toISOString(),
            });
        }

        return NextResponse.json({ message: "Test submitted successfully", score }, { status: 200 });
    } catch (error) {
        console.error("Error handling test submission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
