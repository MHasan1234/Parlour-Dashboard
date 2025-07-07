import { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";

const Attendance = () => {
  const [attended, setAttended] = useState([]);

  useEffect(() => {
    fetchAttendance();

    socket.on("attendance-update", (data) => {
    
      setAttended(data);
      
    });

    return () => {
      socket.off("attendance-update");
    };
  }, []);

 const fetchAttendance = async () => {
  try {
    const token = localStorage.getItem("token"); 
    const res = await axios.get("http://localhost:5000/api/attendance/logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAttended(res.data);
  } catch (err) {
    console.error("Error fetching attendance logs", err);
  }
};


  return (
    <div className="container py-4">
      <h3>Live Attendance</h3>
      <ul className="list-group">
        {attended.map((entry) => (
          <li key={entry._id} className="list-group-item">
            {entry.employee?.name || "Unknown"} — {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
