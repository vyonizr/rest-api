const route = require("express").Router()
const APIRoute = require("./api")

route.use("/api", APIRoute)

module.exports = route