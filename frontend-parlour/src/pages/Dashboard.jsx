import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="d-flex gap-3">
        <Link to="/employees" className="btn btn-outline-primary">Employees</Link>
        <Link to="/tasks" className="btn btn-outline-secondary">Tasks</Link>
        <Link to="/attendance" className="btn btn-outline-success">Live Attendance</Link>
        <Link to="/punch" className="btn btn-outline-info">Punch</Link>
      </div>
    </div>
  );
}
