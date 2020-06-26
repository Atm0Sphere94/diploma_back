const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  text: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  date: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  source: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
