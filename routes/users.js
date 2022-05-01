const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
const config = require("../config/database");

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email ,
        password: req.body.password

    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
            console.log(err);
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        // There is no user with that email
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        // User found, check password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if(isMatch) {
                // create jwt
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: '604800' // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        email: user.email,
                        firstname: user.firstName,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});

module.exports = router;