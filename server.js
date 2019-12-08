// Require Necessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require Route Files
const indexRouter = require('./app/routes/index');
const articlesRouter = require('./app/routes/articles');

// Require DB Configuration File
const db = require('./config/db');

// Establish  Database Connection
mongoose.connect(db, {useNewUrlParser: true});
mongoose.connection.once('open', () =>{ // when its connected for the first time it should display this message
    console.log('Connected to Mongo');
});

// Instantiate Express Application Object || Make an Express App
const app = express();

// Define a PORT for the API to run on 
const port = process.env.PORT || 5000; // if the env has a number use it if not use 5000 || proce... comes from node
const reactPort = 3000;
    /*** MIDDLEWARE ***/
// Add `bodyParser` middleware which will parse JSON requests into JS objects before they reach the route files.

// The method `.use` sets up middleware for the Express application
app.use(express.json());

// Set CORS headers on response from this API using the `cors` NPM Package
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` }));

    /*** ROUTES ***/
// Mount imported Routers
app.use(indexRouter);
app.use(articlesRouter);

// Start the server to listen for requests on a given port
app.listen(port, () =>{
    console.log(`blogy is listening on port ${port}`);
});