import React, { useEffect, useState } from "react";
import api from "../api/api";
import Card from "../components/Card";
import socket from "../socket";

const Resources = () => {
  const [resources, setResources] = useState([]);

  // Default learning resources (static)
  const defaultResources = [
    {
      _id: "math-1",
      title: "Mathematics",
      description: "Exercises, revision notes, and tutorials covering algebra, geometry, fractions, and CBC competency tasks.",
      link: "https://www.khanacademy.org/math",
    },
    {
      _id: "eng-1",
      title: "English",
      description: "Grammar practice, reading comprehension, writing skills, and CBC literacy learning resources.",
      link: "https://www.ixl.com/ela",
    },
    {
      _id: "sci-1",
      title: "Science",
      description: "CBC-aligned science notes, experiments, observation tasks, and discovery-based learning videos.",
      link: "https://www.ck12.org/science",
    },
    {
      _id: "kis-1",
      title: "Kiswahili",
      description: "Lugha, fasihi, msamiati, na shughuli za ujifunzaji wa CBC kwa Kiswahili.",
      link: "https://kiswahili.co.ke",
    },
    {
      _id: "cs-1",
      title: "Computer Studies",
      description: "Coding basics, digital literacy, computer operations, and interactive lessons.",
      link: "https://www.codecademy.com/",
    },
  ];

  const fetchResources = async () => {
    try {
      const res = await api.get("/resources");
      // Combine backend resources with default subjects
      setResources([...defaultResources, ...res.data]);
    } catch (err) {
      console.error(err);
      // If backend fails, still show default resources
      setResources(defaultResources);
    }
  };

  useEffect(() => {
    fetchResources();
    socket.on("dashboardUpdated", fetchResources);
    return () => socket.off("dashboardUpdated", fetchResources);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        Learning Resources
      </h2>
      <p className="text-gray-600 mb-6">
        Explore curated CBC-friendly learning materials across different subjects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((res) => (
          <Card
            key={res._id}
            title={res.title}
            description={res.description}
            link={res.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;
