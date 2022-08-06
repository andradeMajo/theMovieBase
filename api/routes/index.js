const router = require('express').Router();

const UserControllers= require("../controllers/UserControllers")

router.get("/getMe", UserControllers.getMe)
router.get("/login", UserControllers.loginUser)
router.post("/register",UserControllers.registerUser)
router.post("/addMovie", UserControllers.addMovie)
router.get("/favoritesMovies/:_id", UserControllers.favsMovies)

module.exports = router;