"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import Navbar from "../dashboard/_components/navbar";
export default function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ New: Error state

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error on new submission

 



    setLoading(true);
    fetch("/api/atsResume", { method: "POST" })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
  }  
  return (
    <>
           <Navbar />
    <div className="flex flex-col mt-4 items-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Upload Resume for ATS Scoring</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Upload Resume (PDF/DOCX)</Label>
              <Input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="mt-1" />
            </div>

            <div>
              <Label className="text-sm font-semibold">Job Description</Label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Analyzing..." : "Check ATS Score"}
            </Button>
          </form>

          {loading && (
            <div className="mt-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-2/4" />
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{errorMessage}</p>
            </div>
          )}

          {atsScore !== null && (
            <div className="mt-6 p-4 bg-gray-100 border rounded">
              <h3 className="font-bold text-lg">ATS Score:</h3>
              <p className="text-xl font-semibold text-blue-600">{atsScore}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
}
