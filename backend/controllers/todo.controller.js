import Todo from "../models/todo.models.js";
import User from "../models/user.models.js";

export async function createTodo(req, res) {
  try {
    const { title, description, completed, reminder, priority, username } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new Todo
    const todo = new Todo({
      title,
      description,
      completed: completed || false,
      reminder: reminder || null,
      priority: priority || "medium",
      user: user._id,
    });

    const savedTodo = await todo.save();

    
    user.list.push(savedTodo);
    await user.save();

    res.status(201).json({ message: "Todo created successfully", todo: savedTodo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}