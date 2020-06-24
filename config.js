<<<<<<< HEAD
=======
const mongoose = require('mongoose');

>>>>>>> stage-1
const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey';

<<<<<<< HEAD

module.exports = {
  PORT,
=======
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
>>>>>>> stage-1
  JWT_SECRET,
};
