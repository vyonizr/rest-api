module.exports = (req, res, next) => {
  if (req.authenticatedUser.id == req.params.id) {
    next()
  }
  else {
    res.status(401).json({
      message: "You are not this user."
    })
  }
}
