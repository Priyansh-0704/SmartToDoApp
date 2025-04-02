import cron from 'node-cron';
import Todo from '../models/todo.models.js';
import { sendEmail } from '../utils/emailservices.js';
import moment from 'moment-timezone';

const checkReminders = async () => {
  const now = moment().tz("Asia/Kolkata");
  const todayDate = now.format("DD/MM/YYYY");
  const currentTime = now.format("HH:mm");

  try {
    // Find all todos where reminderDate matches today and reminderTime matches current time
    const todosToRemind = await Todo.find({
      reminderDate: todayDate,  
      reminderTime: currentTime, 
      completed: false, 
    }).populate('user'); 

    todosToRemind.forEach(async (todo) => {
      const emailSubject = `Reminder: ${todo.title}`;
      const emailBody = `
        Hello ${todo.user.username},

        This is a reminder for your Todo:

        📝 Title: ${todo.title}
        📄 Description: ${todo.description}
        📅 Reminder Date: ${todo.reminderDate}
        🕒 Reminder Time: ${todo.reminderTime}
        ⚡ Priority: ${todo.priority}

        Don't forget to complete it soon! 🚀
      `;

      // Send email reminder to the user
      await sendEmail(todo.user.email, emailSubject, emailBody);
      console.log(`Reminder sent for Todo: ${todo.title}`);
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};

// Run the task every minute
cron.schedule('* * * * *', checkReminders);

export default checkReminders;
