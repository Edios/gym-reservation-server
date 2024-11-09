const express = require('express');
const connectDB = require('./config/db');
const authRoutes= require('./routes/auth');
const classRoutes= require('./routes/classes.js');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(require('cors')());

connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/classes',classRoutes);

const PORT=process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
