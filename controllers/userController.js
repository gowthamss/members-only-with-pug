require('dotenv').config();
const User = require('../models/user');
const Post = require('../models/post');

const async = require('async');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Sign up get
exports.sign_up_get = (req, res, next) => {
    res.render('signup_form');
}

// Sign up post
exports.sign_up_post = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First Name must be specified'),
    body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last Name must be specified'),
    body('username').trim().isEmail().escape().withMessage('Email must be specified'),
    body('password').trim().isLength({ min: 6 }),
    check('password').exists(),
    check('confirm_password', 'Confirm password should match with password').exists().custom((value, { req }) => value === req.body.password),

    (req, res, next) => {
        const secret = process.env.SECRET_CODE;
        const { first_name, last_name, username, password, membership } = req.body;
        // Extract the validation errors from the request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array())
                // There are errors, render the form again with errors
            res.render('signup_form', { signup_details: req.body, errors: errors.array() });
            return;
        } else {
            if (membership.trim() === '') {
                // Data from from is valid
                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) { return next(err); }
                    const user = new User({
                        first_name: first_name,
                        last_name: last_name,
                        username: username,
                        password: hashedPassword,
                        status: false
                    }).save((err, user) => {
                        if (err) { return next(err); }
                        res.redirect(`/${user._id}`);
                        return;
                    })
                });
            } else if (membership === secret) {
                // Data from from is valid
                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) { return next(err); }
                    const user = new User({
                        first_name: first_name,
                        last_name: last_name,
                        username: username,
                        password: hashedPassword,
                        status: true
                    }).save((err, user) => {
                        if (err) { return next(err); }
                        res.redirect(`/${user._id}`);
                        return;
                    })
                });
            } else {
                res.render('signup_form', { signup_details: req.body, invalidCode: true, errors: errors.array() });
                return;
            }
        }
    },
];

// Login get
exports.login_get = (req, res, next) => {
    res.render('login_form');
}

// Login post
// exports.login_post = [
//     body('username').trim().isLength({ min: 1 }).withMessage('Please enter username'),
//     body('username').trim().isLength({ min: 1 }).withMessage('Please enter password'),
//     (req, res, next) => {
//         // Collect validation results
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             // There are errors, so render the form with errors
//             res.render('login_form', { errors: errors.array() });
//         }
//         passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
//         // res.redirect(`/${user._id}`);
//         // next();

//     }
// ];

// Logout get
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

// // Secret code get
// exports.join_with_secret_code_get = (req, res, next) => {
//     res.render('secret_page');
// }

// // Secret code post
// exports.join_with_secret_code_post = [
//     body('secret').trim().isLength({ min: 1 }).withMessage('Secret can not be empty'),
//     (req, res, next) => {
//         const secret = 'qwerty'
//             // Get validation errors
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             // There are errors, so render the form same as GET
//             res.render('secret_page', { errors: errors.array() });
//             return;
//         }
//         if (req.body.secret !== secret) {
//             res.render('secret_page', { invalidCode: true });
//             return;
//         }

//         res.redirect('/signup');
//     }
// ];