import React, { useEffect, useState } from "react";
import api from "../api/api";
import Card from "../components/Card";
import socket from "../socket";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
    socket.on("dashboardUpdated", fetchSessions);
    return () => socket.off("dashboardUpdated", fetchSessions);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((s) => (
          <Card
            key={s._id}
            title={`Tutor: ${s.tutor}, Student: ${s.student}`}
            description={`Start: ${new Date(s.startTime).toLocaleString()}${s.endTime ? `\nEnd: ${new Date(s.endTime).toLocaleString()}` : ""}\nNotes: ${s.notes || "None"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sessions;