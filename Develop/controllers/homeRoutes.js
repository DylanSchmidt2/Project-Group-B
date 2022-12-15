const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User } = require("../models");
const db = require('../models');

//Login 
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//GET single recipe
router.get("/recipe/:id", (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "ingredients"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }

      // serialize the data
      const recipe = dbRecipeData.get({ plain: true });

      // pass data to template
      res.render("single-recipe", {
        recipe,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET all recipes
router.get("/", (req, res) => {
  Recipe.findAll({
   // attributes: ["id", "title", "ingredients"],
    include: [
      {
        model: User,
      //  attribute: [" name "]
      }
    ]
  })
  .then(dbRecipeData => {
    //console.log('dbRecipeData', dbRecipeData)
    const recipe = dbRecipeData.map(recipe => recipe.get({ plain: true }));
    res.render('all-recipes', {
        recipe,
        loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.get('/dashboard', (req, res) => {
//   // get the recipes from the database
//   db.Recipes.findAll()
//     .then((recipes) => {
//       // Render the dashboard view and pass the recipes to the template
//       const recipe = recipes.map(recipe => recipe.get({ plain: true }));
//       res.render('dashboard', {
//         recipes,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch((error) => {
//       // If there was an error, render the error page
//       res.render('error', { error });
//     });
// });


module.exports = router;
