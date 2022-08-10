const router = require('express').Router();
const requireAuth=require("../middlewares/requireAuth")
const UserControllers= require("../controllers/UserControllers")

router.get("/getMe",requireAuth, UserControllers.getMe)
router.post("/login",  UserControllers.loginUser)
router.get("/logout",requireAuth, UserControllers.logoutUser)
router.post("/register",UserControllers.registerUser)
router.post("/addMovie", UserControllers.addMovie)
router.delete("/deletMovie", UserControllers.deletMovie)
router.get("/favoritesMovies/:_id", UserControllers.favsMovies)
router.get("/searchUser", UserControllers.searchUser)


module.exports = router;