const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', todoRoutes);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        console.error('Validation Error:', err); 
        return res.status(400).send({ error: 'Invalid request data' });
    }
    next(err);
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

module.exports = app;