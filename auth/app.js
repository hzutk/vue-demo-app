"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db = new DB("sqlitedb")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
}

app.use(allowCrossDomain)


router.post('/auth/register', function(req, res) {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  function (err) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    db.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("There was a problem getting user")
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    });
  });
});

router.post('/auth/update_profile', function(req, res) {
  db.update({
      $name: req.body.name,
      $phone: req.body.phone,
      $city: req.body.city,
      $address: req.body.address,
      $inn: req.body.inn,
      $site: req.body.site,
      $org: req.body.org,
      $email: req.body.email,
      // bcrypt.hashSync(req.body.password, 8)
  },
  function (err) {
    if (err) return res.status(500).send("There was a problem registering the user."+err+JSON.stringify(req.body))
    db.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("There was a problem getting user")
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    });
  });
});

router.post('/auth/register-admin', function(req, res) {
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
    1
  ],
  function (err) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    db.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("There was a problem getting user")
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    });
  });
});

router.get('/auth/me', function(req, res) {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(200).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });

    db.selectById(String(decoded.id), (err, user) => {
      // if (err) return res.status(500).send('Error on the server.');
      // if (!user) return res.status(404).send('No user found.');
      // let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
      // if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      // let token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: 86400 // expires in 24 hours
      // });
      res.status(200).send({ auth: true, token: token, user: user });
    });
    // res.status(200).send(decoded);
  });
});

router.post('/auth/login', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(200).send({
      auth: false,
      error: "user",
      message: "Пользователь с таким логином не найден",
      token: null
    });
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    if (!passwordIsValid) return res.status(200).send({
      auth: false,
      error: "password",
      message: "Пароль указан неверно",
      token: null
    });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, user: user });
  });
})

app.use(router)

let port = process.env.PORT || 3003;

let server = app.listen(port, function() {
  console.log('Express server listening on port ' + port)
});
