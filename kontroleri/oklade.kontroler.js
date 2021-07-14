const Kladitelj = require("../modeli/korisnik") 
const ZahtjevUplate = require("../modeli/zahtjeviZaUplatu")
const OkladaDvaTip = require("../modeli/2tip.oklade")



exports.upisListica = (req,res) =>{
var parovi=[];
const listic=req.body.listic;
const ulog=req.body.ulog;
    
        listic.map((oklada,index)=>{
      
                const par = {
                            opisGeneralni:oklada.opisGeneralni,
                            odigraniTip:oklada.opisTipa,
                            dobitniOmjer:0,
                            pogoden:"error"
                            }
            OkladaDvaTip.findOne({opisOklade:oklada.opisGeneralni},(err,provjeraOklade)=>{
       
                        if(oklada.opisTipa===provjeraOklade.dobitniTip)
                                {par.pogoden=true;par.dobitniOmjer=provjeraOklade.dobitniOmjer}
                        else{par.pogoden=false;par.dobitniOmjer=100}
                                                                                        })
    parovi.push(par)
     
                                    })
    
    
    Kladitelj.findOne({_id:req.body.id},(err,kladitelj)=>{
      var provjera=[];
            for (let index = 0; index < parovi.length; index++) {
                     provjera.push(parovi[index].pogoden)
                                                                }
      var koef=1;
             parovi.map((par,index)=>{
                                        koef=(koef*(100/par.dobitniOmjer)).toFixed(2)
                                    })
      let result = provjera.every(Boolean);

      if(result){kladitelj.novcanik+=ulog*koef}
      if(!result){kladitelj.novcanik-=ulog}
      kladitelj.listici={
        parovi:parovi,
        ulog:ulog,
        dobitni:result
      }
    
      kladitelj.save()
      res.send({poruka:"uspješno uplaćeno"})
    })
    }