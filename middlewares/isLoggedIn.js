const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    req.authenticatedUser = decodedToken
    next()
  }
  catch (err) {
    res.status(401).json({
      message: "You are not authenticated. Please login first."
    })
  }
}