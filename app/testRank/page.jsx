"use client";

import { db } from "@/utils/db";
import { submission } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import Navbar from "../dashboard/_components/navbar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns"; 

const TestRank = () => {
    const { user } = useUser();
    const [allRank, setAllRank] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("user", user);

    useEffect(() => {
        if (user) {
            getTestRank();
        }
    }, [user]);

    const getTestRank = async () => {
        setLoading(true);

        try {
           
            const result = await db
                .select()
                .from(submission)
                .orderBy(desc(submission.score));

            setAllRank(result);
        } catch (error) {
            console.error("Failed to fetch test rankings:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader2Icon className="animate-spin h-6 w-6" />
            </div>
        );
    }

    return (
        <>
             <Navbar />
             <center>
            <div>
                <div>
                <h1 className="mt-4 text-3xl font-semibold " >Test Ranking</h1>
                </div>
                <div className="max-w-lg mx-auto mb-6">
          <Input
            type="text"
            placeholder="Search Rank by Name"
            className="w-full p-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
            </div>
        <div className="overflow-x-auto mt-4 ml-10 ">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Submission Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allRank.map((rank, index) => {
                       
                    

                        return (
                            <TableRow key={rank.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{rank?.userName}</TableCell>
                                <TableCell>{rank?.email}</TableCell>
                                <TableCell>{rank.score}</TableCell>
                                <TableCell>{format(new Date(rank.createdAt), "MMM dd, yyyy HH:mm")}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
        </center>
        </>
    );
};

export default TestRank;
