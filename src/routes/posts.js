import express from 'express';
import { Post } from '../model/Post';
import createHttpError from 'http-errors';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

router.get('', async (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const posts = await Post.findAll({
    limit: 10,
    offset: offset,
  });

  res.send(posts.map(p => p.toJSON()));
});

router.get('/:id', async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id }, });

  if (!post) {
    res.status(404);
    res.send(createHttpError(404));
    return;
  }

  res.send(post.toJSON());
});

const checkJwt = auth({
  audience: 'forum-api',
  issuerBaseURL: `https://dev-ez2f8ejiacjig1qh.us.auth0.com/`,
  algorithms: ["RS256"],
});
router.post('', checkJwt, async (req, res) => {
  console.log(req.body);

  const newpost = await Post.create({
    title: req.body.title,
    username: req.body.username,
    content: req.body.content
  });

  res.send(newpost);
});

router.put('/:id', checkJwt, async (req, res) => {
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

router.delete('/:id', checkJwt, async (req, res) => {
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
