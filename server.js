const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Replace * with frontend domain in production
}));

// Routes
app.use('/api/users', userRoutes);

//uri
const uri = "mongodb+srv://root:root@cluster0.spoizjd.mongodb.net/fakestore";

// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

