"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from '../dashboard/_components/navbar'
export default function AlumniPage() {
  const { user } = useUser();
  const router = useRouter();
  const [posts, setPosts] = useState([]); // Alumni Job Posts
  const [externalJobs, setExternalJobs] = useState([]); // External API Jobs
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    company: "",
    location: "",
    jobLink: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all job posts (Alumni + External)
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Fetch alumni job posts
        const alumniRes = await fetch("/api/alumni");
        const alumniData = await alumniRes.json();
        setPosts(alumniData);

        // Fetch external job posts (Example: Replace with actual API)
        const externalRes = await fetch("/api/external-jobs");
        const externalData = await externalRes.json();
        setExternalJobs(externalData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to post.");
      return router.push("/sign-in");
    }

    setLoading(true);
    const res = await fetch("/api/alumni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Post Created!");
      router.refresh(); // Refresh page to show new posts
    } else {
      alert("Failed to create post.");
    }
    setLoading(false);
  };

  return (
    <div>
       <Navbar/>
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎓 Job Board</h1>

      {/* 🔹 Post Creation Form (Visible only to logged-in users) */}
      {user && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Create a Job Post</h2>
          <input name="title" placeholder="Job Title" onChange={handleChange} required className="w-full p-2 mb-2 border" />
          <textarea name="content" placeholder="Job Description" onChange={handleChange} required className="w-full p-2 mb-2 border" />
          <input name="company" placeholder="Company (optional)" onChange={handleChange} className="w-full p-2 mb-2 border" />
          <input name="location" placeholder="Location (optional)" onChange={handleChange} className="w-full p-2 mb-2 border" />
          <input name="jobLink" placeholder="Job Link (optional)" onChange={handleChange} className="w-full p-2 mb-2 border" />
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 mt-2">
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      )}

     
    </div>
    </div>
  );
}
