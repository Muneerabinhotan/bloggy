// Require Necessary NPM Packages
const express = require('express');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/*
* Action:       INDEX
* Method:       GET
* URI:          /
* Description:  Get the Root Route
*/
// Export the Routern so we can use it in the server.js file
router.get('/', (req,res) => {
    res.json({ message: 'Welcome to Blogy'});
});

module.exports = router;