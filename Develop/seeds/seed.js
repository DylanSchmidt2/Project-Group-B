const sequelize = require('../config/connection');
const { Recipe } = require('../models');

const recipeData = require('./recipesData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
const recipe = await Recipe.create({
    recipeData,
});
 process.exit(0);
};

seedDatabase();