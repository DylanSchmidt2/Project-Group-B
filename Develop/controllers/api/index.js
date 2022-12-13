const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;