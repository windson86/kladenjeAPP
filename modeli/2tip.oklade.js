const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const dvaTipOkladeSchema = new Schema({
    opisOklade:String,
    opisPrvogIshoda:String,
    prviIshod:Number,
    opisDrugogIshoda:String,
    drugiIshod:Number,
    dobitniTip:String,
    dobitniOmjer:Number,
    datumPostavljanja: Date,
    datumIsteka: Date,
    
    
});

const dvaTipaOklade = mongoose.model("dvotipnaOklada",dvaTipOkladeSchema);

module.exports = dvaTipaOklade;