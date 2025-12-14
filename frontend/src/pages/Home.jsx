import React from "react";
 import Navbar from "../components/Navbar";

const subjects = [
  { id: 1, name: "Mathematics", color: "bg-yellow-400" },
  { id: 2, name: "Science", color: "bg-green-400" },
  { id: 3, name: "English", color: "bg-blue-400" },
  { id: 4, name: "Kiswahili", color: "bg-red-400" },
  { id: 5, name: "Computer Studies", color: "bg-purple-400" },
];

const Home = () => {
  const handleSubjectClick = (subject) => {
    alert(`You selected ${subject.name}! Explore tutoring sessions for this subject.`);
  };

  return (    
  <div className="min-h-screen bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 flex flex-col">
      
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-purple-900 mb-4">
          Welcome to CBC Peer Tutoring
        </h1>
        <p className="text-lg text-purple-800 mb-2 max-w-2xl">
          Our mission is to connect learners with knowledgeable peers for collaborative learning.
        </p>
        <p className="text-md text-purple-700 mb-12 max-w-xl">
          Join our community of motivated students and tutors to achieve academic excellence together!
        </p>

        <h2 className="text-3xl font-semibold text-purple-900 mb-6">Choose a Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all ${subject.color} text-white font-bold text-xl`}
              onClick={() => handleSubjectClick(subject)}
            >
              {subject.name}
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-purple-900 text-white py-6 text-center">
        &copy; {new Date().getFullYear()} CBC Peer Tutoring. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
