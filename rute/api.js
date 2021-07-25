const { provjeraRegistracije,provjeraAdmina } = require("../middle");

const kontroler = require("../kontroleri/auth.kontroler");
const okladeKontroler = require ("../kontroleri/oklade.kontroler")
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

app.post("/api/test",okladeKontroler.test);

  app.post("/api/izracunajOkladu",
  [provjeraRegistracije.provjeraAdmina],
  okladeKontroler.izracunajOkladu); 

  app.post("/api/igrajListic", okladeKontroler.upisListica);

  app.post("/api/isAdmin", kontroler.isAdmin);

  app.post("/api/dodajOkladu", okladeKontroler.dodavanjeOklade);

  app.post("/api/odradiUplatu", kontroler.uplatiNaRacun);

  app.post("/api/zahtjevUplate", kontroler.zahtjevUplate);

  app.post("/api/getAccbyID",kontroler.GetAccByID);

  app.get("/api/get/allUplate",kontroler.sveUplate);

  app.get("/api/get/allOklade",okladeKontroler.dohvatiOklade);

  app.post("/api/login", kontroler.signin);
};