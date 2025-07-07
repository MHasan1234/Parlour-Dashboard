import { useEffect, useState } from "react";
import api from "../utils/api";


export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      const data = Array.isArray(res.data) ? res.data : res.data.employees || [];
      setEmployees(data);
    } catch (err) {
      console.error("Fetch employees failed:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/employees/${editingId}`, { name, email, position });
      } else {
        await api.post("/employees", { name, email, position });
      }
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(`${editMode ? "Update" : "Add"} employee failed:`, err);
    }
  };

  const handleEdit = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setPosition(employee.position);
    setEditingId(employee._id);
    setEditMode(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPosition("");
    setEditingId(null);
    setEditMode(false);
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
 
    <div className="container py-4">
      <h3>Employees</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <div className="d-flex gap-2">
          <button className="btn btn-success">
            {editMode ? "Update Employee" : "Add Employee"}
          </button>
          {editMode && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="list-group">
        {employees.map((e) => (
          <li key={e._id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{e.name}</strong> ({e.email}) — {e.position || "No position"}
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-warning" onClick={() => handleEdit(e)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(e._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  
    
  );
}
