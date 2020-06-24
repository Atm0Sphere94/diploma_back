const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey';

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = {
  PORT,
  connectDB,
  JWT_SECRET,
};
