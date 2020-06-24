const router = require('express').Router({ mergeParams: true });

<<<<<<< HEAD
const { getUser } = require('../controllers/users');
=======
const getUser = require('../controllers/users');
>>>>>>> stage-1

router.get('/users/me', getUser);
module.exports = router;
