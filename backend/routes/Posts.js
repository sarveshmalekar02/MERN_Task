const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).send('Post created');
    } catch (error) {
        res.status(500).send('Error creating post');
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
        res.json(post);
    } catch (error) {
        res.status(500).send('Error updating post');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.send('Post deleted');
    } catch (error) {
        res.status(500).send('Error deleting post');
    }
});

router.post('/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        post.likes += 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).send('Error liking post');
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const post = await Post.findById(id);
        post.comments.push(comment);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).send('Error commenting on post');
    }
});

module.exports = router;
