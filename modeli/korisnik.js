const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const paroviSchema = new Schema({
    opisGeneralni:String,
    odigraniTip:String,
    pogoden:Boolean
})
const listicSchema = new Schema({
    parovi:[paroviSchema],
    ulog:Number,
    dobitni:Boolean

})
const KorisnikSchema = new Schema({
    ime:String,
    prezime:String,
    username:String,
    password:String,
    email:String,
    listici:[listicSchema],
    novcanik:Number
    
});

const Korisnik = mongoose.model("Kladitelj",KorisnikSchema);

module.exports = Korisnik;