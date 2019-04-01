const route = require("express").Router()
const usersRoute = require("./users")
const UserController = require("../../controllers/UserController")

route.post("/register", UserController.registerAUser)
route.post("/login", UserController.loginUser)

route.use("/users", usersRoute)

module.exports = route