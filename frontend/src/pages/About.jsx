import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-green-900 mb-6">About CBC Peer Tutoring</h1>
        <p className="text-lg text-green-800 mb-6 max-w-3xl mx-auto">
          CBC Peer Tutoring is a platform designed to empower students through peer-to-peer learning. Our tutors are students who excel in their subjects and are passionate about helping others succeed.
        </p>
        <p className="text-md text-green-700 mb-6 max-w-3xl mx-auto">
          Whether you need help with Mathematics, Science, English, or Computer Science, CBC Peer Tutoring connects you with a peer who understands your learning needs.
        </p>
        <p className="text-md text-green-700 max-w-3xl mx-auto">
          Our mission is to foster a collaborative and encouraging learning environment where students can grow academically and personally. Join our community and explore interactive sessions, tailored resources, and real-time guidance from your peers.
        </p>
      </main>
      <footer className="bg-green-900 text-white py-6 text-center">
        &copy; {new Date().getFullYear()} CBC Peer Tutoring. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
