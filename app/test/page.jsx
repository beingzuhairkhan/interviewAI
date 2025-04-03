
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "../dashboard/_components/navbar";

export default function TestPage() {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false); 
  const [score, setScore] = useState(0); 

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await fetch("/api/cron/generateTest", { method: "POST" });
        let data = await response.json();

        
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        console.log("Data", data);

 
        const parsedQuestions = JSON.parse(data.questions).map((item) => {
         const [questionText, ...options] = item.question.split(/(?=\s[A-D]\s)/);

          return {
            question: questionText.trim(),
            options: item.options.map(opt => opt.replace(/^[A-D]\s/, "")),
            answer: item.answer,
          };
        });

        setTest({ topic: data.topic, questions: parsedQuestions, testId: data?.id });
      } catch (error) {
        console.error("Error fetching test:", error);
        setTest({ topic: "Data Science", questions: [] }); 
      }
    }

    fetchTest();
  }, []);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = async () => {
    if (!test) return;

    const formattedAnswers = test.questions.map((q, index) => ({
      question: q.question.split(/(?=\s[A-D]\s)/),
      options: q.options.map(opt => opt.replace(/^[A-D]\s/, "")),
      correctAnswer: q.answer,
      userAnswer: answers[index] || null,
    }));

    try {
      const response = await fetch("/api/submitTest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test?.testId,
          submittedAnswers: formattedAnswers, 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setSubmitted(true); 
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {submitted ? (
          // Show score after submission
          <Card className="shadow-lg border rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{test?.topic} Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl">Your Score: {score}/{test?.questions.length}</h3>
              <Button className="w-full mt-4" onClick={() => window.location.reload()}>
                Retake Test
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Show test form if not submitted
          <Card className="shadow-lg border rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{test?.topic} Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              {test?.questions.map((item, index) => (
                <div key={index} className="mb-6 p-4 border-b last:border-b-0">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {item.question}
                  </h3>
                  <RadioGroup
                    value={answers[index] || ""}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                  >
                    {item.options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-2 p-2">
                        <RadioGroupItem value={option} id={`option-${index}-${i}`} />
                        <label htmlFor={`option-${index}-${i}`} className="text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <Button className="w-full mt-4" onClick={handleSubmit}>
                Submit Answers
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
