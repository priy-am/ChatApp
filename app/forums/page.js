import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const topics = [
  {
    text: "Python",
    img: "/python.svg",
    desc: "Python is a programming language that lets you work more quickly and integrate your systems more effectively.",
    slag: "python",
  },
  {
    text: "JavaScript",
    img: "/js.svg",
    desc: "JavaScript is a versatile programming language used for web development, enabling dynamic and interactive experiences.",
    slag: "javascript",
  },
  {
    text: "TypeScript",
    img: "/ts.svg",
    desc: "TypeScript is a superset of JavaScript that adds static typing, enhancing code maintainability and scalability.",
    slag: "typescript",
  },
  {
    text: "React",
    img: "/react.svg",
    desc: "React is a JavaScript library for building user interfaces, focusing on component-based architecture and performance.",
    slag: "react",
  },
  {
    text: "Next.js",
    img: "/next.svg",
    desc: "Next.js is a React framework for server-side rendering, static site generation, and powerful API routes.",
    slag: "nextjs",
  },
  {
    text: "Node.js",
    img: "/node.svg",
    desc: "Node.js is a runtime environment that allows JavaScript to be used for backend development, enabling scalable network applications.",
    slag: "nodejs",
  },
  {
    text: "MongoDB",
    img: "/db.svg",
    desc: "MongoDB is a NoSQL database designed for flexibility and scalability, widely used in modern web applications.",
    slag: "mongodb",
  },
  {
    text: "Express.js",
    img: "/express.svg",
    desc: "Express.js is a minimal and flexible Node.js web application framework that simplifies backend development.",
    slag: "express",
  },
  {
    text: "Svelte",
    img: "/svelte.svg",
    desc: "Svelte is a modern front-end framework that compiles components into highly efficient vanilla JavaScript.",
    slag: "svelte",
  },
  {
    text: "Tailwind CSS",
    img: "/tail.svg",
    desc: "Tailwind CSS is a utility-first CSS framework that provides rapid styling capabilities for modern web design.",
    slag: "tailwind",
  },
];

const Forums = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl text-center font-bold mb-8">Discuss Forums</h1>{" "}
      {/* Added margin-bottom */}
      <div className="flex flex-wrap justify-center gap-6">
        {" "}
        {/* Increased gap for better spacing */}
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg w-1/4 p-6  flex flex-col items-center hover:scale-105 transition duration-300" // Improved styling
          >
            <div className="mb-4">
              {" "}
              {/* Added margin bottom for image spacing */}
              <Image
                src={topic.img}
                alt={topic.text}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />{" "}
              {/* Increased image size and made it round */}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {" "}
              {/* Improved heading styling */}
              {topic.text}
            </h2>
            <p className="text-gray-600 text-center line-clamp-3">
              {" "}
              {/* Improved paragraph styling and added line-clamping */}
              {topic.desc}
            </p>
            <Link href={`/forum/${topic.slag}`}>
              <Button
                variant="outline"
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Join Discussion
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forums;
