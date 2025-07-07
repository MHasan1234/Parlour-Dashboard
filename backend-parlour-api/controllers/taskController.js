const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    const task = new Task({ title, description, assignedTo, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, dueDate } = req.body;

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, dueDate },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, dueDate } = req.body;

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, dueDate },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};


exports.deleteTask = async (req, res) => {
  try {
   if (req.user.role !== "super-admin") {
  return res.status(403).json({ message: "Only Super Admin can delete tasks" });
}

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
