const { provjeraRegistracije, provjeraAdmina, authJwt } = require("../middle");

const kontroler = require("../kontroleri/auth.kontroler");
const okladeKontroler = require("../kontroleri/oklade.kontroler");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/save",
    [provjeraRegistracije.provjeriDupliUsernameEmail],

    kontroler.signup
  );

  app.post("/api/test", [authJwt.verifyToken], okladeKontroler.test);

  app.post(
    "/api/izracunajOkladu",
    [provjeraRegistracije.provjeraAdmina],
    [authJwt.verifyToken],
    okladeKontroler.izracunajOkladu
  );

  app.post(
    "/api/igrajListic",
    [authJwt.verifyToken],
    okladeKontroler.upisListica
  );

  app.post(
    "/api/obrisiListic",
    [authJwt.verifyToken],
    okladeKontroler.izbrisiListic
  );

  app.post("/api/isAdmin", kontroler.isAdmin);

  app.post(
    "/api/dodajOkladu",
    [authJwt.verifyToken],
    okladeKontroler.dodavanjeOklade
  );

  app.post("/api/odradiUplatu", [authJwt.verifyToken], kontroler.uplatiNaRacun);

  app.post(
    "/api/zahtjevUplate",
    [authJwt.verifyToken],
    kontroler.zahtjevUplate
  );

  app.post("/api/getAccbyID", [authJwt.verifyToken], kontroler.GetAccByID);

  app.get(
    "/api/get/allUplate",
    [authJwt.verifyToken, provjeraRegistracije.provjeraAdmina],
    kontroler.sveUplate
  );

  app.get(
    "/api/get/allOklade",

    okladeKontroler.dohvatiOklade
  );

  app.post("/api/login", kontroler.signin);
};
