const router = require('express').Router();
const { Recipe } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

///Create recipe
router.post('/', withAuth, (req, res) => {
  Recipe.create({
    title: req.body.title,
    ingredients: req.body.ingredients,
    user_id: req.session.user_id
  })
    .then(dbRecipeData => res.json(dbRecipeData))

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//Update recipe
router.put('/:id', withAuth, (req, res) => {
  Recipe.update({
      title: req.body.title,
      recipe_content: req.body.recipe_content
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//Delete recipe
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const recipeData = await Recipe.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!recipeData) {
        res.status(404).json({ message: 'No recipe found with this id!' });
        return;
      }
  
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Save recipe

  module.exports = router;
  