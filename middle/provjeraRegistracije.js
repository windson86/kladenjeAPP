const Kladitelj = require("../modeli/korisnik") 


provjeriDupliUsernameEmail = (req, res, next) => {
    // Username
    Kladitelj.findOne({
      username: req.body.username
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
        email: req.body.email
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
    provjeriDupliUsernameEmail
   
  };
  
  module.exports = provjeraRegistracije;