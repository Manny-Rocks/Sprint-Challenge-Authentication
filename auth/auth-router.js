const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./secret")
const Users = require("./auth-model.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(200).json(saved)
    })
    .catch(err => {
      res.status(500).json({ message: "Tough luck bro"})
    })

});

const generateToken = user => {
  const payload = {
    username: user.username,
    id: user.id,
    department: user.department
  }
  const options = {
    expiresIn: "1d"
  }

  return jwt.sign(payload, secrets.jwtSecret, options)

}

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: "Haiii",
                token
            })
        } else {
            res.status(401).json({ message: "invalid credentials" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Don't worry. It's not you; it's me"});
    })
});

module.exports = router;