// Require Necessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');

// Require Route Files
const indexRouter = require('./app/routes/index');

// Instantiate Express Application Object || Make an Express App
const app = express();

// Define a PORT for the API to run on 
const port = process.env.PORT || 5000; // if the env has a number use it if not use 5000 || proce... comes from node

    /*** ROUTES ***/
    
// Mount imported Routers
app.use(indexRouter);

// Start the server to listen for requests on a given port
app.listen(port, () =>{
    console.log(`blogy is listening on port ${port}`);
});