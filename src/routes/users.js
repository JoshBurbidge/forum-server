import express from 'express';
import { Post } from '../model/Post';

const router = express.Router();

router.get('/:id/posts', async (req, res) => {
  const posts = await Post.findAll({ where: { username: req.params.id }, });

  res.send(posts.map(p => p.toJSON()));
});


export default router;
