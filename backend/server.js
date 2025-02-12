require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')

const {mongoURI:db} = require('./config/keys.js')
const userRoutes = require('./routes/User');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(express.json()); //includes body-parser
app.use(session({secret: 'jameswwwww',resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', userRoutes);


// Connect to MongoDB
mongoose.connect(db);



// Define routes and middleware


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { PORT };
