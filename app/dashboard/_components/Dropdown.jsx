"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { LogOut, PlusCircle , Award ,ChartColumn  } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { styles } from "@/lib/styles";

const DEFAULT_ROLE = "student"; // ✅ Default role

const UserDropdown = ({ setOpen, handleProfile }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();
  const searchParams = useSearchParams();
  

  // ✅ Initialize role from localStorage or default
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") || DEFAULT_ROLE;
    }
    return DEFAULT_ROLE;
  });

  useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata?.role || searchParams.get("role") || DEFAULT_ROLE;

      if (typeof window !== "undefined" && localStorage.getItem("role") !== userRole) {
        localStorage.setItem("role", userRole);
        setRole(userRole);
      }
    }
  }, [user, searchParams]);

  const handleLogout = async () => {
    await signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("role"); // ✅ Clear role on logout
    }
    router.push("/sign-in");
  };

  return (
    <Dropdown className="bg-white  p-4 rounded-2xl text-xl">
      <DropdownTrigger>
        <Avatar
          src={user?.imageUrl } // ✅ Fallback image
          alt={`${user?.firstName || "User"}'s profile picture`}
          className="w-[40px] h-[40px] cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-white">
        {/* My Profile */}
        <DropdownItem
          onClick={() => {
            if (handleProfile) handleProfile();
            if (setOpen) setOpen(false);
          }}
        >
          <div className="flex w-full items-center p-2 rounded-lg hover:bg-gray-200">
            <Avatar src={user?.imageUrl } alt="User avatar" className="w-[35px] h-[35px]" />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>My Profile</span>
          </div>
        </DropdownItem>

       
        {role === "student" && (
          <DropdownItem>
            <Link href="/jobs" className="flex w-full mt-2 p-2 rounded-lg items-center hover:bg-gray-200">
              <PlusCircle className="text-xl mr-2 text-black" />
              <span className={`${styles.label} text-black text-[16px] pl-2`}>Create Jobs</span>
            </Link>
          </DropdownItem>
        )}
        {/* Rank */}
        <DropdownItem>
      <Link href="/testRank" passHref>
        <div className="flex items-center  mt-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <Award   className="text-xl mr-2 text-black" />
          <span className={`${styles.label} text-black text-[16px]`}>Test Rank</span>
        </div>
      </Link>
    </DropdownItem>
    <DropdownItem>
      <Link href="/graph" passHref>
        <div className="flex items-center  mt-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <ChartColumn   className="text-xl mr-2 text-black" />
          <span className={`${styles.label} text-black text-[16px]`}>Test Graph</span>
        </div>
      </Link>
    </DropdownItem>

        {/* Logout */}
        <DropdownItem onClick={handleLogout}>
          <div className="flex items-center ml-2 mt-2 p-2 rounded-lg hover:bg-gray-200">
            <LogOut className="text-xl mr-2 text-black" />
            <span className={`${styles.label} text-black text-[16px]`}>Log out</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
