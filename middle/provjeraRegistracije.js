const Kladitelj = require("../modeli/korisnik");

provjeraAdmina = (req, res, next) => {
  const user = req.body.user;

  if (user.username === "windson86") {
    next();
  } else {
    return res.status(202).send({ poruka: "not admin" });
  }
};

provjeraTokena = (req, res, next) => {};

provjeriDupliUsernameEmail = (req, res, next) => {
  // Username
  Kladitelj.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    Kladitelj.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const provjeraRegistracije = {
  provjeriDupliUsernameEmail,
  provjeraAdmina,
};

module.exports = provjeraRegistracije;
