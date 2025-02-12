//Google Login
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { google } = require('googleapis');
const moment = require('moment');
require("../config/passport");

// middleware
function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

//function
const getEventsForDay = async (auth, date) => {
    try {
        const calendar = google.calendar({ version: 'v3', auth });

        const startOfDay = moment(date).startOf('day').format();
        const endOfDay = moment(date).endOf('day').format();

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: startOfDay,
            timeMax: endOfDay,
            maxResults: 100, // Increase if needed
            singleEvents: true,
            orderBy: 'startTime',
        });

        return response.data.items;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Failed to fetch events');
    }
};

//routes
router.get('/',(req,res)=>{
  res.send('<a href="auth/google">Authenticate with Google</a>');
})

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email','profile','https://www.googleapis.com/auth/calendar.readonly'],
  })
)

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5050/api/calendar/events',  
    failureRedirect: 'http://localhost:5050/api/auth/failure' 
  })
);

router.get('/auth/failure',isLoggedIn,(req,res)=>{
  res.send("something went wrong!");
});

router.get('/calendar/events/:date?', isLoggedIn, async (req, res) => {
    try {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: req.user.accessToken });

        const date = req.params.date || moment().format('YYYY-MM-DD'); // Default to today
        const events = await getEventsForDay(auth, date);

        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;