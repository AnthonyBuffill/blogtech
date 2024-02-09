const router = require('express').Router();
const { User, Blogpost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({});
    const blogs = blogData.map((project) => project.get({ plain: true }));

    if(req.session.logged_in){

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  }
  else{
    res.render('login')
  }
  } 
    catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;