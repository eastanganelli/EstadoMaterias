'use strict'
// https://regbrain.com/article/bootstrap-express
const dotenv   = require('dotenv').config();
const express  = require('express');
// const session  = require('express-session');

const IndexRoute  = require('./routes/index.route');
const StatusRoute = require('./routes/status.route');
const {
    AddMemberRoute,
    AddMemberFrontRoute
} = require('./routes/addmember.route');

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
app.get(IndexRoute);
app.use(StatusRoute);
app.use(AddMemberRoute);
app.use(AddMemberFrontRoute);

app.listen(port, () => {
    if (DEVMODE) {
        console.log(`Application started in development mode on http://localhost:${port}`);
    }
});