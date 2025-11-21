import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../api/api";
import socket from "../socket";

const subjects = ["Math", "Science", "English", "History", "Computer Science"];

const Dashboard = () => {
  const [activeSubject, setActiveSubject] = useState("Math");
  const [stats, setStats] = useState({ journals: 0, resources: 0, sessions: 0 });

  const fetchStats = async () => {
    try {
      const journals = await api.get("/journal/:userId");
      const resources = await api.get("/resources");
      const sessions = await api.get("/sessions");
      setStats({
        journals: journals.data.length,
        resources: resources.data.length,
        sessions: sessions.data.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    socket.on("dashboardUpdated", fetchStats);
    return () => socket.off("dashboardUpdated", fetchStats);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {subjects.map((subject) => (
          <Card key={subject} title={subject} onClick={() => setActiveSubject(subject)} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Journal Entries">{stats.journals}</Card>
        <Card title="Resources">{stats.resources}</Card>
        <Card title="Sessions">{stats.sessions}</Card>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Button color="blue" onClick={() => alert(`Add journal for ${activeSubject}`)}>Add Journal</Button>
        <Button color="green" onClick={() => alert(`View resources for ${activeSubject}`)}>View Resources</Button>
        <Button color="purple" onClick={() => alert(`Schedule session for ${activeSubject}`)}>Schedule Session</Button>
      </div>
    </div>
  );
};

export default Dashboard;
