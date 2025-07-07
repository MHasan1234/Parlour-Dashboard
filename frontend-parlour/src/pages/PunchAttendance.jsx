import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

export default function PunchAttendance() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.error(" Failed to fetch employees:", err);
    }
  };

  const punch = async (id, currentStatus) => {
    const newStatus = currentStatus === "PUNCHED_IN" ? "PUNCHED_OUT" : "PUNCHED_IN";
    console.log("Punching", { id, currentStatus, newStatus });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/punch",
        { employeeId: id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Punch updated:", res.data);
      fetchEmployees(); 
    } catch (err) {
      console.error("Punch failed:", err.response?.data || err.message);
      alert("Punch failed");
    }
  };

  return (
    <div className="container py-4">
      <h3> Punch In/Out</h3>
      <ul className="list-group">
        {employees.map((e) => (
          <li key={e._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{e.name} — {e.status || "UNKNOWN"}</span>
            <button
              className="btn btn-primary"
              onClick={() => punch(e._id, e.status)}
            >
              Punch
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
