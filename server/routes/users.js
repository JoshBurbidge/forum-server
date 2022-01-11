var express = require('express');
var router = express.Router();
const shajs = require('sha.js');

const { Error, FieldError } = require('../model/errors/Error');
const { User } = require('../model/User');


// need to login after register - get cookie
router.post('/register', async (req, res) => {
    // console.log(req.body);

    if (req.body.username.length < 3) {
        res.status(400);
        res.send({
            errors: new FieldError('username', 'username must be at least 3 characters')
        });
        return;
    }

    if (req.body.password.length < 8) {
        res.status(400);
        res.send({
            errors: new FieldError('password', 'password must be at least 8 characters')
        });
        return;
    }

    const hashed = shajs('sha256').update(req.body.password).digest('base64');
    // add salting

    try {
        const newuser = await User.create({
            username: req.body.username,
            password: hashed
        });
        res.send(newuser);
    } catch (error) {
        if (error.parent.code === 'ER_DUP_ENTRY') {
            res.status(400);
            res.send({ errors: new FieldError('username', 'username already taken') });
        }
        else {
            res.status(500);
            res.send({ message: 'error' });
        }
    }
});


router.post('/login', async (req, res) => {
    // console.log(req.body);

    const signedCookies = req.signedCookies;
    if (signedCookies.userId !== undefined) {
        res.send({
            login: false,
            error: new Error('user already logged in')
        });
        return;
    }

    if (req.body.password.length < 8) {
        res.send({
            login: false,
            error: new Error('invalid login')
        });
        return;
    }

    const hashed = shajs('sha256').update(req.body.password).digest('base64');
    // add salting
    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: hashed
        }
    });

    // if user was not found -> invalid login
    if (!user) {
        res.send({
            login: false,
            error: new Error('invalid login')
        });
    } else {
        // user was found -> valid login
        res.cookie('userId', user.getDataValue('id'), {
            signed: true,
        });
        console.log('added cookie');
        res.send({
            login: true,
            user
        });
    }
});

router.post('/logout', (req, res) => {
    if (req.signedCookies.userId !== undefined) {
        res.clearCookie('userId');
        res.send({
            logout: true
        });
    } else {
        res.send({
            logout: false,
            error: new Error('no user is logged in')
        });
    }
});


module.exports = router;