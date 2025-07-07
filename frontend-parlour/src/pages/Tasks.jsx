import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [employee, setEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchAll = async () => {
    const res1 = await api.get("/tasks");
    const res2 = await api.get("/employees");
    setTasks(res1.data);
    setEmployees(Array.isArray(res2.data) ? res2.data : res2.data.employees || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/tasks/${editingId}`, {
          title,
          assignedTo: employee,
        });
      } else {
        await api.post("/tasks", { title, assignedTo: employee });
      }

      resetForm();
      fetchAll();
    } catch (err) {
      console.error("Task save failed:", err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEmployee(task.assignedTo?._id || "");
    setEditMode(true);
    setEditingId(task._id);
  };

  const resetForm = () => {
    setTitle("");
    setEmployee("");
    setEditMode(false);
    setEditingId(null);
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchAll();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container py-4">
      <h3>Tasks</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="form-control mb-2"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        >
          <option value="">Assign to...</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>

        <div className="d-flex gap-2">
          <button className="btn btn-success">
            {editMode ? "Update Task" : "Add Task"}
          </button>
          {editMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="list-group">
        {tasks.map((t) => (
          <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {t.title} — {t.assignedTo?.name || "Unknown"}
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleEdit(t)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
