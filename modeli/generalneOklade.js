const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const okladaSchema = new Schema({
    opisOklade:String,
    sanse:Array,
    tipovi:Array,
    dobitniIndex:Number,

})

const oklada= mongoose.model("oklada",okladaSchema)

module.exports = oklada;