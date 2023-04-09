const express = require('express');
const blogController = require('../controller/blogController');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/blogs', blogController.blog_index);
    // Blog.find().sort({ createAt: -1 })
    //     .then((result) => {
    //         res.render('index', { title: 'All Blogs', blogs: result })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })


router.post('/blogs', blogController.blog_create_post)

router.get('/blog/create', blogController.blog_create_get)

router.get('/blogs/:id', blogController.blog_details)

router.delete('/blogs/:id', blogController.blog_delete)



module.exports = router;