import Todo from "../models/todo.models.js";
import User from "../models/user.models.js";
import { sendEmail } from "../utils/emailservices.js";

export async function createTodo(req, res) {
  try {
    const { title, description, completed, reminder, priority, username } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create Todo
    const todo = new Todo({
      title,
      description,
      completed: completed || false,
      reminder: reminder ? new Date(reminder) : null,
      priority: priority || "medium",
      user: user._id,
    });

    const savedTodo = await todo.save();
    user.list.push(savedTodo);
    await user.save();

    // Send Email Notification
    const emailSubject = `📌 New Todo Created: ${savedTodo.title}`;
    const emailBody = `
      Hello ${user.username},

      Your new Todo has been created:

      📝 Title: ${savedTodo.title}
      📄 Description: ${savedTodo.description}
      🕒 Reminder Time: ${savedTodo.reminder ? new Date(savedTodo.reminder).toLocaleString() : "Not set"}
      ⚡ Priority: ${savedTodo.priority}

      Stay productive! 🚀
    `;

    console.log({subject: emailSubject, body: emailBody});
    await sendEmail(user.email, emailSubject, emailBody);

    res.status(201).json({ message: "Todo created and email sent!", todo: savedTodo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function updateTodo(req, res) {
  try {
    const { title, description, completed, reminder, priority, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, reminder, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Task Updated", todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}