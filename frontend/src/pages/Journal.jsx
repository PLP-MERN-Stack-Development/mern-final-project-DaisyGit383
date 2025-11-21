import React, { useEffect, useState } from "react";
import api from "../api/api";
import Card from "../components/Card";
import Button from "../components/Button";
import socket from "../socket";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  const fetchEntries = async () => {
    try {
      const res = await api.get("/journal/:userId");
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addEntry = async () => {
    if (!newEntry.trim()) return;
    try {
      await api.post("/journal/entry", { entry: newEntry });
      setNewEntry("");
      fetchEntries();
      socket.emit("updateDashboard");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
    socket.on("dashboardUpdated", fetchEntries);
    return () => socket.off("dashboardUpdated", fetchEntries);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Journal</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write a new entry..."
          className="border p-2 rounded-md flex-1"
        />
        <Button onClick={addEntry}>Add</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Card key={entry._id} title={entry.entry} />
        ))}
      </div>
    </div>
  );
};

export default Journal;