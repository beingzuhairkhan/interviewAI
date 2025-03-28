import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link || "#"}
          key={item?.link || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title || "Untitled Job"}</CardTitle>
          
        
            <CardDescription className="text-justify" >{item.content || "No description available."}</CardDescription>
            <div className="flex justify-between" >
         <div>
         <div className="mt-4 text-gray-400 text-sm">
              <p><strong>Company:</strong> {item.company || "N/A"}</p>
              <p><strong>Location:</strong> {item.location || "N/A"}</p>
            </div>
            <div className="mt-2 text-gray-400 text-xs">
              <p><strong>Posted on:</strong> {item.createdAt ? new Date(item.createdAt).toDateString() : "Unknown Date"}</p>
              <p><strong>Posted by:</strong> {item.alumniName || "Anonymous"}</p>
            </div>
          </div>
            
            <div>
            <Image
      src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydXNBWlEwYWU1YkFtMG9yRWt3THZTbzBlVTAifQ"
      alt="Job Posting"
      width={100} // Adjust size as needed
      height={100}
      className=" object-cover rounded-xl mb-4"
      priority
    />
            </div>
            </div>
            <div>
            {item.jobLink && (
              <div className="mt-4">
                <a
                  href={item.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Apply Now
                </a>
              </div>
            )}
            </div>
         
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => (
  <div className={cn("rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className)}>
    <div className="relative z-50 p-4">{children}</div>
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
    {children}
  </h4>
);

export const CardDescription = ({ className, children }) => (
  <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
    {children}
  </p>
);
