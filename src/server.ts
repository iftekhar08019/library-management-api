import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGODB_URI!;

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
