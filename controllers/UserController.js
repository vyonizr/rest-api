const {User} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserController {
  static getAllUsers(req, res) {
    User.findAll({
      order: [["id", "ASC"]]
    })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getAUser(req, res) {
    User.findByPk(req.params.id)
    .then(foundUser => {
      res.status(200).json(foundUser)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static createAUser(req, res) {
    User.findOne({
      where: {
        role: "admin"
      }
    })
    .then(foundAdmin => {
      if (foundAdmin && req.body.role === "admin") {
        throw ("Failed to create a user. You cannot create another admin")
      }
      else {
        return User.create({
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        })
      }
    })
    .then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static deleteAUser(req, res) {
    User.findByPk(req.params.id)
    .then(foundUser => {
      return foundUser.destroy()
    })
    .then(() => {
      res.json({
        "message": "Delete success"
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static updateAUser(req, res) {
    User.findOne({
      where: {
        role: "admin"
      }
    })
    .then(foundAdmin => {
      if (req.body.role === "admin" && foundAdmin.id != req.params.id) {
        throw ("Update role failed. There is already an admin")
      }
      else {
        return User.findByPk(req.params.id)
      }
    })
    .then(foundUser => {
      foundUser.username = req.body.username,
      foundUser.password = req.body.password
      if (req.body.role !== "") {
        foundUser.role = req.body.role
      }
      return foundUser.save()
    })
    .then(udpatedUser => {
      res.status(200).json(udpatedUser)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static registerAUser(req, res) {
    User.findOne({
      where: {
        role: "admin"
      }
    })
    .then(foundAdmin => {
      if (foundAdmin && req.body.role === "admin") {
        throw ("Register failed. There is already an admin")
      }
      else {
        return User.create({
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        })
      }
    })
    .then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static loginUser(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(foundUser => {
      if (!foundUser) {
        res.status(401).json({
          message: "user not found"
        })
      }
      else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.status(401).json({
          message: "wrong username/password"
        })
      }
      else {
        const token = jwt.sign({
          id: foundUser.id,
          role: foundUser.role
        }, process.env.JWT_SECRET)

        res.status(200).json({
          message: "you have successfully logged in",
          token: token
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = UserController