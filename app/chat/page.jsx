"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "../dashboard/_components/navbar";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

export default function Chat() {
  const { user, isLoaded } = useUser();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const chatContainerRef = useRef(null);

  // Auto-scroll function
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !user) return;

    socket.emit("joinChat", { user: user.fullName, email: user.primaryEmailAddress });

    socket.on("chatHistory", (messages) => {
      setChat(messages);
      scrollToBottom();
    });

    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]); 
      scrollToBottom();
    });

    socket.on("activeUsers", (activeUsers) => {
      setUsers(activeUsers); 
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("activeUsers");
    };
  }, [isLoaded, user, scrollToBottom]);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    const newMessage = {
      text: message,
      user: user.fullName,
      email: user.primaryEmailAddress,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", newMessage); 
    setMessage(""); 

    // AI Response Handling
    if (message.startsWith("@")) {
      try {
        const response = await fetch("/api/getChatResponse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        if (data.aiResponse) {
          socket.emit("sendMessage", {
            text: data.aiResponse,
            user: "AI Bot",
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Please log in to access the chat.</p>;

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Active Users */}
        <div className="w-1/4 p-4 bg-gray-900 rounded-lg mt-6 ml-2 text-white flex flex-col">
          <h2 className="font-bold text-lg mb-4">Active Users</h2>
          <div className="h-full overflow-y-auto">
            {users.map((u, index) => (
              <Card key={index} className="mb-2 p-2 bg-gray-800 flex items-center">
                <span className="text-green-400 animate-pulse">●</span>
                <span className="text-white ml-2">{u.user}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Box */}
        <div className="w-3/4 p-6 flex flex-col h-full">
          <Card className="flex-1 overflow-hidden border p-4 bg-white rounded-md shadow">
            <div className="h-[75vh] overflow-y-auto" ref={chatContainerRef}>
              {chat.map((msg, index) => {
                const isAIResponse = msg.user === "AI Bot";
                const isCurrentUser = msg.user === user.fullName;

                return (
                  <CardContent
                    key={index}
                    className={`mb-3 p-2 rounded-lg flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[60%] ${
                        isCurrentUser ? "bg-black text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      <span className="font-semibold">{msg.user}:</span> {msg.text}
                      {isAIResponse && (
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-600">
                          AI Response
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                );
              })}
            </div>
          </Card>

          {/* Message Input Fixed at Bottom */}
          <div className="flex bg-white p-4 border-t fixed bottom-0 w-3/4">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-3 w-full rounded-l-md"
              placeholder="Type a message... (Use @ for AI response)"
            />
            <Button onClick={sendMessage} className="bg-black ml-2 mr-6 text-white px-6 py-3 rounded-r-md hover:bg-gray-700">
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
