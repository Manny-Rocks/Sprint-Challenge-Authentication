const router = require('express').Router();
const bcrypt = require("bcryptjs");

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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
