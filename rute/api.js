const { provjeraRegistracije } = require("../middle");

const kontroler = require("../kontroleri/auth.kontroler");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/save",
    [
      provjeraRegistracije.provjeriDupliUsernameEmail
    ],
    kontroler.signup
  );

  app.post("/api/isAdmin", kontroler.isAdmin);

  app.post("/api/dodajOkladu", kontroler.dodavanjeOklade);

  app.post("/api/odradiUplatu", kontroler.uplatiNaRacun);

  app.post("/api/zahtjevUplate", kontroler.zahtjevUplate);

  app.post("/api/getAccbyID",kontroler.GetAccByID);

  app.get("/api/get/allUplate",kontroler.sveUplate);

  app.get("/api/get/allOklade",kontroler.dohvatiSlobodneOklade);

  app.post("/api/login", kontroler.signin);
};