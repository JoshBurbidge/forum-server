import express from 'express';
import shajs from 'sha.js';
import { Error, FieldError } from '../model/errors/Error';
import { User } from '../model/User';
import { Post } from '../model/Post';

const router = express.Router();

router.get('/me', async (req, res) => {
  // console.log('headers: ', req.rawHeaders);
  const userId = req.signedCookies.userId;
  console.log('userId' + userId);
  if (userId === undefined) {
    res.send({ loggedIn: false });
    return;
  }

  const user = await User.findOne({ where: { id: userId } });
  console.log({
    loggedIn: true,
    id: userId,
    username: user.getDataValue('username')
  });
  res.send({
    loggedIn: true,
    id: userId,
    username: user.getDataValue('username')
  });
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({
    where: { id: userId },
    //include: Post
  });
  res.send(user);
});

router.get('/:id/posts', async (req, res) => {
  const posts = await Post.findAll({
    where: { UserId: req.params.id },
    include: User
  });

  res.send(posts.map(p => p.toJSON()));
});

// need to login after register - get cookie
router.post('/register', async (req, res) => {
  console.log(req.body);

  if (req.body.username.length < 3) {
    res.status(400);
    res.send({ errors: new FieldError('username', 'username must be at least 3 characters') });
    return;
  }

  if (req.body.password.length < 8) {
    res.status(400);
    res.send({ errors: new FieldError('password', 'password must be at least 8 characters') });
    return;
  }

  if (req.signedCookies.userId !== undefined) {
    res.status(400);
    res.send({ errors: new Error('you are already logged in') });
    return;
  }

  const hashed = shajs('sha256').update(req.body.password).digest('base64');

  try {
    const newuser = await User.create({
      username: req.body.username,
      password: hashed
    });
    res.cookie('userId', newuser.getDataValue('id'), { signed: true, });
    res.send(newuser);
  } catch (error) {
    console.log(error);
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
  //console.log(req);

  const signedCookies = req.signedCookies;
  if (signedCookies.userId !== undefined) {
    res.status(400);
    res.send({
      login: false,
      errors: new Error('user already logged in')
    });
    return;
  }

  if (req.body.password.length < 8) {
    res.status(400);
    res.send({
      login: false,
      errors: new Error('invalid login')
    });
    return;
  }

  const hashed = shajs('sha256').update(req.body.password).digest('base64');

  const user = await User.findOne({
    where: {
      username: req.body.username,
      password: hashed
    }
  });

  // if user was not found -> invalid login
  if (!user) {
    res.status(400);
    res.send({
      login: false,
      errors: new Error('invalid login')
    });
  } else {
    // user was found -> valid login
    const userId = user.getDataValue('id');
    res.cookie('userId', userId, { signed: true, });
    console.log(`added cookie: userId = ${userId}`);
    res.send({
      login: true,
      "user": {
        username: user.getDataValue('username'),
        id: userId
      }
    });
  }
});

router.post('/logout', (req, res) => {
  const userId = req.signedCookies.userId;
  if (userId !== undefined) {
    res.clearCookie('userId');
    console.log(`removed cookie: userId = ${userId}`);
    res.send({ logout: true });
  } else {
    res.send({
      logout: false,
      errors: new Error('no user is logged in')
    });
  }
});


module.exports = router;
