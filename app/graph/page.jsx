"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import Navbar from "../dashboard/_components/navbar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Graph = () => {
  const { user } = useUser();
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWeekData();
    }
  }, [user]);

  const fetchWeekData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-rankings`);
      const data = await response.json();

      console.log(" API Response:", data); 

      if (Array.isArray(data)) {
        setWeekData(data.map((item) => ({
          week: `Week ${item.week}`,
          score: item.score,
        })));
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching week-wise data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2Icon className="animate-spin h-6 w-6" />
        </div>
      ) : (
        <div className="w-full mt-20 h-[400px] flex justify-center items-center">
          <ResponsiveContainer width="80%" height={400}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Graph;
