import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.Routes.js';
import todoRoutes from './routes/todo.Routes.js';
import './schedulers/reminderScheduler.js';  
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors(
));


// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in .env");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB Connection Error:', error.message));

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.use(express.json()); // Parse JSON bodies

app.use('/api/v1/auth', authRoutes);
app.use('/api/v2/todo', todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");
