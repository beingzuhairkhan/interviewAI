"use client";

import { useState, useEffect } from "react";
import Navbar from "../dashboard/_components/navbar";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { Input } from "@/components/ui/input"; // Import ShadCN Input
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getAlljob"); 
        const data = await response.json();
     
        const formattedJobs = data.map((job) => ({
          title: job.title,
          content: job.content,
          company: job.company,
          location: job.location,
          alumniName: job.alumniName,
          createdAt: job.createdAt,
          jobLink: job.jobLink || "#",
          image:job.imageURL
        }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      {loading ? (<div className="flex justify-center items-center h-screen">
          <Loader2Icon size="25" className="animate-spin h-6 w-6" /> 
        </div>
      ) : (
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
      )}
    </div>
  );
}