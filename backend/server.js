import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.Routes.js';

dotenv.config();
const app = express();

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
 app.use(express.json()); // Middleware to parse JSON requests
app.use('/api/v1/auth',authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
