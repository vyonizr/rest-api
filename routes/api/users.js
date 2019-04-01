const route = require("express").Router()
const UserController = require("../../controllers/UserController")
const { isLoggedIn, isAdmin, isHimself } = require("../../middlewares")

route.use(isLoggedIn)
route.get("/", isAdmin, UserController.getAllUsers)
route.get("/:id", isHimself, UserController.getAUser)
route.post("/", isAdmin, UserController.createAUser)
route.delete("/:id", isAdmin, UserController.deleteAUser)
route.put("/:id", isHimself, UserController.updateAUser)

module.exports = route