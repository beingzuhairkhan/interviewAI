"use client";

import { useState, useEffect } from "react";
import Navbar from '../dashboard/_components/navbar'
export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/getAlljob");
        const data = await response.json();
        console.log("Fetched Jobs:", data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🚀 Job Listings</h1>

      {jobs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.content}</p>

              <div className="mt-4 text-gray-700">
                <p><strong>🏢 Company:</strong> {job.company}</p>
                <p><strong>📍 Location:</strong> {job.location}</p>
              </div>

              <div className="mt-4 text-gray-700">
                <p><strong>👨‍🎓 Posted By:</strong> {job.alumniName}</p>
                <p><strong>📧 Email:</strong> <a href={`mailto:${job.alumniEmail}`} className="text-blue-600 hover:underline">{job.alumniEmail}</a></p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">📅 Posted on {new Date(job.createdAt).toDateString()}</span>
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No jobs available at the moment.</p>
      )}
    </div>
    </div>
  );
}
