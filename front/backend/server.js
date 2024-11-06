// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
