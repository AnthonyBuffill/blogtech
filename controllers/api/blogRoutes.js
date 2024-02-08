
const router = require('express').Router();
const { Blogpost, User } = require('../../models');

router.get('/all', async (req, res) => {
  try {
    const blogposts = await Blogpost.findAll({
      include: 
      [{ model: User,
         attributes: ['name', 'email'] 
       }],

      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(blogposts);
  } 
    catch (err) {
    res.status(500).json(err);
  }
});

router.get('/currentposts', async (req, res) => {
  try {
    const blogposts = await Blogpost.findAll({
      include: [{ model: User, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    });

    const logged_in = req.session.logged_in || false;
    res.render('homepage', { blogposts, logged_in });
  } 
    catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/create', (req, res) => {
  res.render('homepage', { createForm: true });
});

router.post('/create-blogpost', async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.session.user_id; 
  
    const newBlogpost = await Blogpost.create({
      title,
      body,
      user_id: userId,
    });
   
    res.redirect('/currentposts');
  } 
    catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

module.exports = router;



