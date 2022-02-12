var express = require('express');
var router = express.Router();

const { Post } = require('../model/Post');
const { Error, FieldError } = require('../model/errors/Error');
const { User } = require('../model/User');


router.get('/all', async (req, res) => {
  // console.log("offset: ", req.query.offset);
  //let dbquery = { limit: 10 };
  let offset = 0;
  if (req.query.offset) offset = parseInt(req.query.offset);

  let posts = await Post.findAll({
    limit: 10,
    offset: offset,
    include: {
      model: User,
      attributes: ['username']
    }
  }
  );

  res.send(posts.map(p => p.toJSON()));
});

router.get('/byUser/:id', async (req, res) => {
  let posts = await Post.findAll({
    where: {
      UserId: req.params.id
    },
    //include: User
  });

  // for (p in posts) {
  //     console.log(p.getUser());
  // }

  res.send(posts.map(p => p.toJSON()));
});


router.post('/new', async (req, res) => {
  console.log(req.body);

  const newpost = await Post.create({
    title: req.body.title,
    UserId: req.body.userId,
    content: req.body.content
  });

  // console.log(newpost);
  res.send({ saved: true });
})

router.post('/:id/update', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    res.send({
      errors:
        new FieldError('id', `post with ${id} not found`)
    });
    return;
  }

  await post.update({
    title: req.body.title,
    UserId: req.body.userId,
    content: req.body.content
  });
  res.send({
    message: 'updated',
    data: post.toJSON()
  });
})

router.delete('/:id/delete', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    res.status(404);
    res.send({
      errors:
        new Error('id', `post with ${id} not found`)
    });
    return;
  }

  post.destroy();

  res.send({
    message: 'deleted',
    data: post.toJSON()
  });
})

module.exports = router;