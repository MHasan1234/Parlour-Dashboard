const React = require("react");
const { useState } = require("react");
const axios = require("axios");

const PunchForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("PUNCHED_IN");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId || !status) {
      return alert("Please enter all fields");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/attendance/punch", {
        employeeId,
        status,
      });
      setMessage(" " + res.data.message);
      setEmployeeId("");
    } catch (err) {
      setMessage("" + (err.response?.data?.message || "Failed"));
    }
  };

  return (
    <div className="container py-4">
      <h3> Punch In / Out</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            className="form-control"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter employee Mongo ID"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PUNCHED_IN">Punch In</option>
            <option value="PUNCHED_OUT">Punch Out</option>
          </select>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

module.exports = PunchForm;
