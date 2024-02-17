import express from 'express';
import { Post } from '../model/Post';
import { User }  from '../model/User';
import createHttpError from 'http-errors';

const router = express.Router();

router.get('', async (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const posts = await Post.findAll({
    limit: 10,
    offset: offset,
    include: {
      model: User,
      attributes: ['username']
    }
  });

  res.send(posts.map(p => p.toJSON()));
});

router.get('/:id', async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      attributes: ['username']
    }
  });

  if (!post) {
    res.status(404);
    res.send(createHttpError(404));
    return;
  }

  res.send(post.toJSON());
});

router.post('', async (req, res) => {
  console.log(req.body);

  const newpost = await Post.create({
    title: req.body.title,
    UserId: req.body.userId,
    content: req.body.content
  });

  res.send(newpost);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    res.status(404);
    res.send(createHttpError(404));
    return;
  }

  await post.update({
    title: req.body.title,
    content: req.body.content
  });
  res.send(post.toJSON());
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    res.status(404);
    res.send(createHttpError(404));
    return;
  }

  await post.destroy();

  res.status(204);
  res.send();
});

module.exports = router;
