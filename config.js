const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey';


module.exports = {
  PORT,
  JWT_SECRET,
};
