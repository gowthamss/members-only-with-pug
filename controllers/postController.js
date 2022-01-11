const User = require('../models/user');
const Post = require('../models/post');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Get all posts
exports.get_posts = (req, res, next) => {
    // Post.find().exec(function(err, posts) {
    //     if (err) { return next(err); }

    //     res.render('posts_list', { posts });
    // })
    console.log(req.params);
    if (req.params.user) {
        User.findById(req.params.user).exec(function(err, user) {
            if (err) { return next(err); }

            res.render('index', { user: user });
            res.render('layout', { user: user })
        });
        return;
    }
    console.log('user: ', req.params.user)
    res.render('index');
}

// Get individual post
exports.get_post = (req, res, next) => {

}

// Get post create form
exports.post_create_get = (req, res, next) => {

}

// Post post create form
exports.post_create_post = (req, res, next) => {

}