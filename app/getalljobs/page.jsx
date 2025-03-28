"use client";

import { useState, useEffect } from "react";
import Navbar from "../dashboard/_components/navbar";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { Input } from "@/components/ui/input"; // Import ShadCN Input

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/getAlljob"); // ✅ Ensure correct API endpoint
        const data = await response.json();
        console.log("Fetched Jobs:", data);

        // ✅ Format data to match HoverEffect structure
        const formattedJobs = data.map((job) => ({
          title: job.title,
          content: job.content,
          company: job.company,
          location: job.location,
          alumniName: job.alumniName,
          createdAt: job.createdAt,
          jobLink: job.jobLink || "#",
        }));

        console.log("formatted", formattedJobs);
        setJobs(formattedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className=" py-10 px-6">
 
        <div className="max-w-lg mx-auto mb-6">
          <Input
            type="text"
            placeholder="Search jobs by title or description..."
            className="w-full p-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <HoverEffect items={filteredJobs} />
      </div>
    </div>
  );
}
