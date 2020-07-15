const router = require('express').Router({ mergeParams: true });

const {
  getAllSavedArticles, postArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getAllSavedArticles);
router.post('/articles', postArticle);
router.delete('/articles/:id', deleteArticle);

module.exports = router;
