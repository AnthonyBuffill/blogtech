const sequelize = require('../config/connection');
const { User } = require('../models');
const { Blogpost } = require('../models');
const userData = require('./userData.json');
//const blogpost = require('./blogpost.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //await Blogpost.bulkCreate(userData, {
    //individualHooks: true,
    //returning: true,
  //});

  process.exit(0);
};

seedDatabase();