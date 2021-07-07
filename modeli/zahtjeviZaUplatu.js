const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const uplataSchema = new Schema({
    username:String,
    kolicina:Number,
    odradeno:Boolean
    
});

const Isplata = mongoose.model("Uplata",uplataSchema);

module.exports = Isplata;