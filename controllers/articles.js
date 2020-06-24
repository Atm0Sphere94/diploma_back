const mongoose = require('mongoose');
const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

// GET /articles — возвращает все карточки
const getAllSavedArticles = (async (req, res, next) => {
  try {
    const articles = await Article.find({});
    return res.status(200).send({
      data: articles,
    });
  } catch (error) {
    return next(error);
  }
});

// POST /articles — создаёт карточку
const postArticle = (async (req, res, next) => {
  try {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });
    return res.status(201).send({
      data: article,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
});

// DELETE /articles/:ArticleId — удаляет карточку по идентификатору
const deleteArticle = (async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже карточка
    }
    if (!article.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const articleToDelete = await Article.findByIdAndRemove(id);
    return res.status(200).send({
      message: 'card deleted:',
      data: articleToDelete,
    });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return next(new BadRequestError('This id is not valid'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});


module.exports = {
  getAllSavedArticles,
  postArticle,
  deleteArticle,
};
