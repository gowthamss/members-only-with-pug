var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', postController.get_posts);

// GET sign up page
router.get('/signup', userController.sign_up_get);

// POST sign up data
router.post('/signup', userController.sign_up_post);

// GET login page
router.get('/login', userController.login_get);

// POST login data
// router.post('/login', userController.login_post);

// GET logout
router.get('/logout', userController.logout);

// GET post create form
router.get('/post/create', postController.post_create_get);

// POST post create form
router.post('/post/create', postController.post_create_post);

// // GET secret code page
// router.get('/signup/join-with-secret-code', userController.join_with_secret_code_get);

// // POST secret code page
// router.post('/signup/join-with-secret-code', userController.join_with_secret_code_post);

router.get('/:user', postController.get_posts);

module.exports = router;