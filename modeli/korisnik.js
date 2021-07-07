const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const KorisnikSchema = new Schema({
    ime:String,
    prezime:String,
    username:String,
    password:String,
    email:String,
    novcanik:Number
    
});

const Korisnik = mongoose.model("Kladitelj",KorisnikSchema);

module.exports = Korisnik;