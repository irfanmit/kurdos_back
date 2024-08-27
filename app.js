const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const resumeRoutes = require('./routes/resume');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://faisalirfan2502:sd9DczgClDBNylAH@cluster0.u1dh5.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', userRoutes);
app.use('/resume', resumeRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
