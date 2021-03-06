const Kladitelj = require("../modeli/korisnik");
//const ZahtjevUplate = require("../modeli/zahtjeviZaUplatu")
//const OkladaDvaTip = require("../modeli/2tip.oklade")
const Oklada = require("../modeli/generalneOklade");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

function izracunOklade(sanseArray) {
  var decimalArray = [];
  var i,
    zbroj = 0;
  for (i = 0; i < sanseArray.length - 1; i++) {
    zbroj += sanseArray[i] / 100;
    decimalArray[i] = zbroj;
  }
  var r = Math.random();

  for (i = 0; i < decimalArray.length && r >= decimalArray[i]; i++) {}
  return i;
}

exports.test = (req, res) => {
  console.log(req.headers["x-token"]);
  console.log(req.body);
};

exports.izracunajOkladu = (req, res) => {
  const oklada = req.body.oklada;

  var dobitnaOklada;
  Oklada.findById(oklada._id, (err, oklade) => {
    oklade.dobitniIndex = izracunOklade(oklada.sanse);
    dobitnaOklada = oklade;
    oklade.save();
  }).then(
    Kladitelj.find(
      { "listici.parovi.IdOklade": oklada._id },
      (err, korisnici) =>
        korisnici.map((korisnik, index) => {
          korisnik.listici.map((listic, index) => {
            listic.parovi.map((par, index) => {
              if (dobitnaOklada) {
                if (par.IdOklade === oklada._id) {
                  if (par.odigraniIndex === dobitnaOklada.dobitniIndex) {
                    par.pogoden = true;
                    var dobitni = [];
                    for (let index = 0; index < listic.parovi.length; index++) {
                      dobitni.push(listic.parovi[index].pogoden);
                    }

                    if (Object.values(dobitni).every(Boolean)) {
                      var a = listic.ulog;
                      var b = listic.koef;
                      var dobitak = a * b;
                      if (!listic.isplacen) {
                        korisnik.novcanik += Math.round(dobitak * 1e2) / 1e2;
                      }
                      listic.isplacen = true;
                      listic.dobitni = true;
                    }
                  }
                }
              }
            });
          });
          korisnik.save();
        })
    )
  );
};

exports.upisListica = (req, res) => {
  const parovi = req.body.parovi;
  const koef = req.body.koef;
  const ulog = req.body.ulog;
  Kladitelj.findOne({ _id: req.body.id }, (err, kladitelj) => {
    if (ulog === 0) {
      res.status(202).send({ poruka: "ulog je nula" });
    } else {
      if (kladitelj.novcanik < ulog) {
        res.status(202).send({ poruka: "nedovoljno sredstva" });
      } else {
        kladitelj.listici.push({
          parovi: parovi,
          ulog: ulog,
          koef: koef,
          dobitni: false,
        });
        kladitelj.novcanik -= ulog;
        kladitelj.save();
        res.send({ poruka: "uspje??no upla??eno" });
      }
    }
  });
};
exports.izbrisiListic = (req, res) => {
  Kladitelj.findById(req.body.IdUser, (err, korisnik) => {
    korisnik.listici.map((listic, index) => {
      if (String(listic._id) === req.body.IdListic) {
        korisnik.listici.splice(index, 1);
        korisnik.save();
      }
    });
  });
};

exports.dohvatiOklade = (req, res) => {
  Oklada.find({}, (err, oklada) => {
    if (err) {
      res.status(500).send({ poruka: err });
      return;
    }
    res.send(oklada);
  });
};

exports.dodavanjeOklade = (req, res) => {
  var sum = 0;
  const oklada = new Oklada(req.body);
  req.body.sanse.map((sansa, index) => {
    sum += sansa;
  });

  if (sum === 100) {
    oklada.save();
    res.send({ poruka: "oklada Spremljenja" });
  } else {
    res.status(202).send({ poruka: "gre??ka-zbroj ??ansi nije 100%" });
  }
};
