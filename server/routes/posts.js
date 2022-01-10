var express = require('express');
var router = express.Router();

const { Post } = require('../model/Post');
const { Error, FieldError } = require('../model/errors/Error');


router.get('/all', async (req, res) => {
    let posts = await Post.findAll({});

    res.send(posts.map(p => p.toJSON()));
});

router.get('/byUser/:id', async (req, res) => {
    let posts = await Post.findAll({
        where: {
            author: req.params.id
        }
    });
    console.log(posts);
    res.send(posts.map(p => p.toJSON()));
});

router.post('/new', async (req, res) => {
    console.log(req.body);

    const newpost = await Post.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    console.log(newpost);
    res.send('saved')
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
        author: req.body.author,
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