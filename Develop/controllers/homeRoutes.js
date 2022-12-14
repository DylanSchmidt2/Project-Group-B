const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User } = require("../models");

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
    res.render('homepage', {
        recipe,
        loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
