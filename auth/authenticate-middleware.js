/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secrets = require("./secret");

module.exports = (req, res, next) => {
  // res.status(401).json({ you: 'shall not pass!' });
  const token = req.headers.authorization;
  console.log("Manny wuz here.")
  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
  })

  if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({ message: "Something went wrong"})
          } else {
              req.user = {
                  username: decodedToken.username,
              }
              next()
          }
      })

  } else {
      res.status(400).json({ message: "no token provided"})
  }



};