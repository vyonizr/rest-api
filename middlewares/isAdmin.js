module.exports = (req, res, next) => {
  if (req.authenticatedUser.role === "admin") {
    next()
  }
  else {
    res.status(403).json({
      message: "You are not authorized. Only admin who has this privilege."
    })
  }
}