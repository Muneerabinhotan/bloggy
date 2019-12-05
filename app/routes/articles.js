// Require necessary NPM Packagaes
const express = require('express');

// Require Mongoose Model for Article
const Article = require('../models/article');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/** DOCUMENTATION **
* Action:       INDEX
* Method:       GET
* URI:          /api/articles
* Description:  Get All Articles
*/
router.get('/api/articles', (req,res) => {
    Article.find()
    // Return all Articles as an array
    .then((articles) =>{
        res.status(200).json({ message: 'Get All Articles'});
    })
    // catch any errors that might occur
    .catch((error) =>{
        res.status(500).json({error:error})
    })
});

/** DOCUMENTATION **
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Get an Article by Article ID
*/

/** DOCUMENTATION **
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
*/

/** DOCUMENTATION **
 * Action:      UPDATE
 * Method:      PATCH "PATCH for multiple feild PUT for one feild"
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Update an Article by Article ID
*/


/** DOCUMENTATION **
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Delete an Article by Article ID
*/

// Export the Router so we can use it in the server.js file
module.exports = router;