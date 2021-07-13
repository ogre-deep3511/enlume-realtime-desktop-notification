const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.post('/login', (req, res) => {
    let username = req.body.username;

    User.findOne({email: username})
        .then(user => {
            if(user) {
                res.json({
                    message: "Login Successfully!",
                    value: user
                })
            }else {
                res.json({
                    message: "No user found!"
                })
            }
        })
})

router.post('/register', async (req, res) => {
    const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });

    newUser.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = router;