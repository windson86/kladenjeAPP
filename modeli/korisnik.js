const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const paroviSchema = new Schema({
    opisOklade:String,
    IdOklade:String,
    odigraniIndex:Number,
    dobitniIndex:Number,
    pogoden:{
        type: Boolean,
        default: false
    }
})
const listicSchema = new Schema({
    parovi:[paroviSchema],
    koef:Number,
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