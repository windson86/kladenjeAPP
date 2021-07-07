const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require ("cors")

const app= express();
const PORT = process.env.PORT || 8080;


mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://admin:drazen81413117@oblak.qnbmf.mongodb.net/gradevina?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB spojen")
})


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(morgan("tiny"));



require("./rute/api")(app);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

}

app.listen(PORT, console.log(`Server je pokrenut na portu: ${PORT}.`));