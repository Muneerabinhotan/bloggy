// Require necessary NPM Packagaes
const express = require('express');

// Require Mongoose Model for Article
const Article = require('../models/article').Article
const Comment = require('../models/article').Comment

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
        res.status(200).json({ articles: articles });
    })
    // catch any errors that might occur
    .catch((error) =>{
        res.status(500).json({error:error})
    })
});

/** DOCUMENTATION **
INDEX
*/

router.get('/api/articles/:articleId/comments', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'get' method to the next 'then'
            return res.status(200).json({article: article.comments})
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
/** DOCUMENTATION **
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Get an Article by Article ID
*/
router.get('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        // Pass the result of Mongoose's `.get` method to the next `.then`
        res.status(200).send(article);
      } else {
        // If we couldn't find a document with matching ID || speciliazed errors
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any document'
          }
        });
      }
    })
    // Catch any errors that might occur || generic errors
    .catch((error) => {
      res.status(500).json({ error: error });
    })
  });

/** DOCUMENTATION **
SHOW

*/

router.get('/api/articles/:articleId/comments/:id', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'get' method to the next 'then'
            return res.status(200).json({article: article.comments.id(req.params.id)})
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})

/** DOCUMENTATION **
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
*/
router.post('/api/articles', (req,res) =>{
    Article.create(req.body.article)
    // on a successful `create` action, respond with 201
    // HTTP status and the content of the new article.
    .then((newArticle) =>{
        res.status(201).json({ article: newArticle });
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    })
});

/** DOCUMENTATION **
CREATE
*/

router.post('/api/articles/:articleId/comments', (req, res)=>{
    const newComment = new Comment({body: req.body.commentText})

    Article.findById(req.params.articleId, (err, article)=>{
        article.comments.push(newComment)
        article.save((err, savedArticle)=>{
            res.json(newComment)
        });
    });
});

/** DOCUMENTATION **
 * Action:      UPDATE
 * Method:      PATCH "PATCH for multiple feild PUT for one feild"
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Update an Article by Article ID
*/
router.patch('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
      .then((article) => {
        if (article) {
         // Pass the result of Mongoose's `.update` method to the next `.then`
          return article.update(req.body.article)
        } else {
          // If we couldn't find a document with matching ID || specilazied errors
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any document'
            }
          })
        }
      })
      .then((article) => {
        // If succeeded, return 204 and no JSON
        res.status(200).send(article);
      })
      // Catch any errors that might occur || generic errors
      .catch((error) => {
        res.status(500).json({ error: error });
      })
  });

/** DOCUMENTATION **
UPDATE
*/
  router.patch('/api/articles/:articleId/comments/:id', (req, res)=>{
    const articleId = req.params.articleId
    const commentId = req.params.id
    Article.findById(articleId, (err, article)=>{
        comment = article.comments.id(commentId);
        comment.body = req.body.commentText;
    })
})
/** DOCUMENTATION **
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /api/articles/5d44d6f878989f484
 * Description: Delete an Article by Article ID
*/
router.delete('/api/articles/:id', (req,res) => {
    Article.findById(req.params.id)
    .then((article) =>{
        if(article){
            // Pass the result of Mongoose's `.delete` method to the next `.then`
            return article.remove();}
            else{
            // If we couldn't find a document with the matching ID || speceliazed errors
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            });
        }
    })
    .then(() =>{
        // If the deletion succeeded, return 204 "no content" and no JSON
        res.status(204).end();
    })
    // Catch any errors that might occur || generic errors
    .catch((error) =>{
        res.status(500).json({ error: error });
    })
});

/** DOCUMENTATION **
DESTROY
*/
router.delete('/api/articles/:articleId/comments/:id', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'delete' method to the next 'then'
            article.comments.id(req.params.id).remove()
            article.save()
            return

        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
// Export the Router so we can use it in the server.js file
module.exports = router;