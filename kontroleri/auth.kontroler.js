const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Kladitelj = require("../modeli/korisnik");
const ZahtjevUplate = require("../modeli/zahtjeviZaUplatu");

exports.uplatiNaRacun = (req, res) => {
  ZahtjevUplate.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { odradeno: true } },
    { new: true },
    (err, uplata) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      uplata.save().then(
        Kladitelj.findOne({ username: uplata.username }, (err, kladitelj) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          kladitelj.novcanik = kladitelj.novcanik + uplata.kolicina;
          kladitelj.save();
        })
      );
    }
  );
};

exports.sveUplate = (req, res) => {
  ZahtjevUplate.find({}).exec((err, uplate) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(uplate);
  });
};

exports.zahtjevUplate = (req, res) => {
  const uplata = new ZahtjevUplate(req.body);
  uplata.save();
};

exports.signup = (req, res) => {
  const data = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  const kladitelj = new Kladitelj(data);
  kladitelj.save((err, dolazniuser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  res.send({ ok: true, user: "proba" });
};

exports.isAdmin = (req, res) => {
  Kladitelj.findOne({ _id: req.body.id }).exec((err, kladitelj) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (kladitelj) {
      if (
        kladitelj.username === "windson86" ||
        kladitelj.username === "superadmin"
      ) {
        res.status(202).send({ admin: true });
      }
    }
  });
};

exports.GetAccByID = (req, res) => {
  Kladitelj.findOne({ _id: req.body.id }).exec((err, kladitelj) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (kladitelj) {
      res.send({
        novcanik: kladitelj.novcanik,
        listici: kladitelj.listici,
      });
    }
  });
};

exports.signin = (req, res) => {
  Kladitelj.findOne({ username: req.body.username }).exec((err, kladitelj) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!kladitelj) {
      return res.status(404).send({ message: "Korisnik nije pronađen." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      kladitelj.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: kladitelj._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.send({
      id: kladitelj._id,
      username: kladitelj.username,
      ime: kladitelj.ime,
      prezime: kladitelj.prezime,
      token: token,
    });
  });
};
