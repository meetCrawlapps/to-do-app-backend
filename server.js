const express = require('express');
const app = express();
const port = process.env.PORT || 8000
const taskRouter = require('./routes/task.router')
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const path = require('path');
console.log(process.env.PORT)
connectDB();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/task', taskRouter)

app.listen(port, () => {
    console.log(`listening on ${port}`);
});