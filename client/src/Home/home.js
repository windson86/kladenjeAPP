import React from 'react';
import { userService } from '../servisi/korisnicki.servisi';
let user = JSON.parse(localStorage.getItem('user')) || [];




export default class Home extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
      ulog:0,
      ukupniKef:1,
        sviListici:[],
        novcanik: 0,
        oklade:[],
        listic:[]
    };
    this.promjenaUloga = this.promjenaUloga.bind(this);
    this.handleOklada = this.handleOklada.bind(this);
    this.brisiListic = this.brisiListic.bind(this);
}

promjenaUloga(e){
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

  componentDidMount() {
    userService.getAccInfo(user.id).then(odgovor=>{
      console.log("parovi",odgovor.listici)
      this.setState({
        novcanik:odgovor.novcanik,
        sviListici:odgovor.listici
      })
    })

    userService.prikazsvihSlobodnihOklada().then(odgovor=>{this.setState({oklade:odgovor})})
    
  }
  dodajKune(iznos){
    userService.zahtjevUplate(user.username,iznos)
  }

brisiListic(e){
  console.log("šta bi",this.state.listic)
  this.setState({
    listic:[],
    ukupniKef:1
  })
}
igrajListic(){
  const {listic,ulog}=this.state
  console.log("igranje",listic,ulog)
 userService.igrajListic(ulog,listic,user.id).then(res=>{console.log(res)})
  
}

handleOklada(tip1,opisGeneralni1,opisTipa1){
 

  const novipar={
        tip:tip1,
        opisGeneralni:opisGeneralni1,
        opisTipa:opisTipa1
   }
 this.setState({
   listic:[...this.state.listic,novipar],
   ukupniKef:this.state.ukupniKef*100/tip1
 })

}

  render() {    
    const {oklade,listic,ukupniKef,sviListici,ulog}=this.state
    return (
      <div>
        <div>
      <div>Korisnik:{user.username}</div>
      <div>kuna:{this.state.novcanik}</div>
      <button onClick={()=>{this.dodajKune(50)}}>dodaj 50 Kuna</button>
      </div>
      <span>listići:</span>
{sviListici.map((listici,index)=><div>
          {listici.parovi.map((parovi,index)=>
          <span>  opis:{parovi.opisGeneralni}  TIP:{parovi.odigraniTip} </span>)
           } ulog: {listici.ulog} </div>  
)}
      <div>oklade:</div>

      
     <ul>
                        {oklade.map((oklade, index) =>
                        <div>
                          <li key={oklade._id}>
                                {oklade.opisOklade}
                                <span> - <button onClick={()=>this.handleOklada(oklade.prviIshod,oklade.opisOklade,oklade.opisPrvogIshoda)}>{oklade.opisPrvogIshoda}{oklade.prviIshod}</button>
                                     <button onClick={()=>this.handleOklada(oklade.drugiIshod,oklade.opisOklade,oklade.opisDrugogIshoda)}>{oklade.opisDrugogIshoda}{oklade.drugiIshod}</button>
                                     
                                     </span>

                                
                               
                            </li>
                            </div>
                        )}
                    </ul>
                    <span>listić:</span>
                    {listic.map((parovi,index)=><div>
                      <li key={parovi.opisGeneralni}>
                      naziv oklade:    {parovi.opisGeneralni}
                       koef:{(100/parovi.tip).toFixed(2)}
                       opis oklade:{parovi.opisTipa}

                      </li>
              
                    </div>)}
                    <span>koef:{ukupniKef.toFixed(2)}</span>
                    <button onClick={()=>this.brisiListic()}>obrisi listić</button>
                    <input type="number" className="form-control" name="ulog" value={ulog} onChange={this.promjenaUloga} />
                    <button onClick={()=>this.igrajListic()}>odigraj listić</button>

      </div>
    );
  }
}