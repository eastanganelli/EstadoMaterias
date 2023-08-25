'use strict'

const dotenv   = require('dotenv').config();
const express  = require('express');
// const session  = require('express-session');

const StatusRoute = require('./routes/status.route');

const app = express();

const port = process.env.PORT;
const DEVMODE = (process.env.STATUS === 'dev');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(session({
    secret: dotenv.parsed.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})) */
app.use(express.static('public'));
//initializePassport(app);

// Routes
app.use(StatusRoute);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//app.get('/device', (req, res) => {
//    res.sendFile(__dirname + '/public/device.html');
//});

app.listen(port, () => {
    if (DEVMODE) {
        console.log(`Application started in development mode on http://localhost:${port}`);
    }
});