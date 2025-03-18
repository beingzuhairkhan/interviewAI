import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsPage = ({ interviewQuestion = [], active = 0 }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("does not support text to speech");
    }
  };

  console.log("interviewQuestion:", interviewQuestion); // Debugging

  return (
    Array.isArray(interviewQuestion) && interviewQuestion.length > 0 && (
      <div className="p-5 border rounded-md my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {interviewQuestion.map((question, index) => (
            <h2
              className={`p-2 bg-neutral-300 rounded-xl text-center text-sm md:text-base cursor-pointer ${
                active === index && "bg-neutral-500"
              } `}
              key={index}
            >
              Question {index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-sm md:text-base">
          {interviewQuestion[active]?.question || "No question available"}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(interviewQuestion[active]?.question)}
        />
        <div className="border rounded-md p-4 mt-8">
          <p className="flex gap-1 items-center text-muted-foreground">
            <Lightbulb className="text-yellow-500" />
            <span className="font-semibold">Note:</span>
          </p>
          <p className="pl-6 mt-1 text-muted-foreground">
            Click on Record when you want to answer the question. After you
            finish the Interview, you will get immediate feedback on your answers.
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionsPage;
