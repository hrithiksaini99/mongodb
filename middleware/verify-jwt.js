// verify-jwt.js

const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' })
  }

  jwt.verify(token, 'secretKey', (error, decoded) => {
    if (error) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token' })
    }
    req.userId = decoded.id
    next()
  })
}

module.exports = verifyJWT
