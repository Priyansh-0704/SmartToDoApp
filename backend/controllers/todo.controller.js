import Todo from "../models/todo.models.js";
import User from "../models/user.models.js";
import { sendEmail } from "../utils/emailservices.js";
import moment from "moment-timezone";

// Create Todo
export async function createTodo(req, res) {
  try {
    const { title, description, completed, reminderDate, reminderTime, priority, id } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let formattedReminderDate = null;
    let formattedReminderTime = null;

    if (reminderDate && reminderTime) {
      const combinedDateTime = moment.tz(`${reminderDate} ${reminderTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
      formattedReminderDate = combinedDateTime.format("YYYY-MM-DD");
      formattedReminderTime = combinedDateTime.format("HH:mm");
    }

    const todo = new Todo({
      title,
      description,
      completed: completed !== undefined ? completed : false,
      reminderDate: formattedReminderDate,
      reminderTime: formattedReminderTime,
      priority: priority || "medium",
      user: user._id,
    });

    const savedTodo = await todo.save();
    user.list.push(savedTodo._id);
    await user.save();

    const emailSubject = `📌 New Todo Created: ${savedTodo.title}`;
    const emailBody = `
      Hello ${user.username},

      Your new Todo has been created:

      📝 Title: ${savedTodo.title}
      📄 Description: ${savedTodo.description}
      📅 Reminder Date: ${formattedReminderDate || "Not set"}
      ⏰ Reminder Time: ${formattedReminderTime || "Not set"}
      ⚡ Priority: ${savedTodo.priority}

      Stay productive! 🚀
    `;

    await sendEmail(user.email, emailSubject, emailBody);

    res.status(201).json({ message: "Todo created and email sent!", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update Todo


export async function updateTodo(req, res) {
  try {
    const { title, description, completed, reminderDate, reminderTime, priority, userId } = req.body;

    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let formattedReminderDate = null;
    let formattedReminderTime = null;

    if (reminderDate && reminderTime) {
      const combinedDateTime = moment.tz(`${reminderDate} ${reminderTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
      formattedReminderDate = combinedDateTime.format("YYYY-MM-DD");
      formattedReminderTime = combinedDateTime.format("HH:mm");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, reminderDate: formattedReminderDate, reminderTime: formattedReminderTime, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const emailSubject = `✅ Todo Updated: ${updatedTodo.title}`;
    const emailBody = `
      Hello ${user.username},

      Your todo has been updated:

      📝 Title: ${updatedTodo.title}
      📄 Description: ${updatedTodo.description}
      ✅ Completed: ${updatedTodo.completed ? "Yes" : "No"}
      📅 Reminder Date: ${formattedReminderDate || "Not set"}
      ⏰ Reminder Time: ${formattedReminderTime || "Not set"}
      ⚡ Priority: ${updatedTodo.priority}

      Keep up the great work! 🚀
    `;

    await sendEmail(user.email, emailSubject, emailBody);

    res.status(200).json({ message: "Todo updated and email sent!", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}



// Delete Todo
export async function deleteTodo(req, res) {
  try {
    const { id: userId } = req.body;
    const todoId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: todoId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const emailSubject = `❌ Todo Deleted: ${todo.title}`;
    const emailBody = `
      Hello ${user.username},

      Your todo has been deleted:

      📝 Title: ${todo.title}
      📄 Description: ${todo.description}

      If this was a mistake, feel free to create a new one! 🚀
    `;

    await sendEmail(user.email, emailSubject, emailBody);

    res.status(200).json({ message: "Todo deleted and email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get Task by User ID and Filter by Priority
export async function getTask(req, res) {
  try {
    const { priority } = req.query;
    const filter = { user: req.params.id };

    if (priority) {
      filter.priority = new RegExp(`^${priority}$`, "i");
    }

    const tasks = await Todo.find(filter).sort({ createdAt: -1 });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Toggle Complete
export async function toggleComplete(req, res) {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.status(200).json({ message: "Todo status updated successfully", todo });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
