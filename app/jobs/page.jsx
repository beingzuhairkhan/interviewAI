"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../dashboard/_components/navbar";
import { toast } from "sonner";

export default function JobForm() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to post.");
      return router.push("/sign-in");
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (res.ok) {
        toast.success("Job Posted Successfully!");
        router.replace('/getalljobs'); 
      } else {
        toast.error(" Failed to create post.");
      }
    } catch (error) {
      toast.error(` Error posting job: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" flex justify-center items-center p-6">
        <div className="max-w-3xl w-full">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                🚀 Post a Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input name="title" id="title" placeholder="Enter job title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Job Description</Label>
                  <Textarea name="content" id="content" placeholder="Enter job description" required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input name="company" id="company" placeholder="Enter company name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input name="location" id="location" placeholder="Enter job location" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobLink">Job Link *</Label>
                  <Input name="jobLink" id="jobLink" placeholder="Enter job URL" required />
                </div>

                <Button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition" disabled={loading}>
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
