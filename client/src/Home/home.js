import React from 'react';
import { userService } from '../servisi/korisnicki.servisi';
let user = JSON.parse(localStorage.getItem('user')) || [];




export default class Home extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
      ukupniKef:1,
        novcanik: 0,
        oklade:[],
        listic:[{
          tip:1,
          opisGeneralni:"",
          opisTipa:""
        }]
    };
    this.handleOklada = this.handleOklada.bind(this);
    this.brisiListic = this.brisiListic.bind(this);
}

  componentDidMount() {
    userService.getAccInfo(user.id).then(odgovor=>{

      this.setState({novcanik:odgovor.novcanik})
    })

    userService.prikazsvihSlobodnihOklada().then(odgovor=>{this.setState({oklade:odgovor})})
    
  }
  dodajKune(iznos){
    userService.zahtjevUplate(user.username,iznos)
  }

brisiListic(e){
  console.log("šta bi",this.state.listic)
  this.setState({
    listic:[{
    
    }]
  })
}

handleOklada(tip1,opisGeneralni1,opisTipa1){
 

  const novipar={
        tip:tip1,
        opisGeneralni:opisGeneralni1,
        opisTipa:opisTipa1
   }
 this.setState({
   listic:[...this.state.listic,novipar],
   ukupniKef:this.state.ukupniKef*tip1
 })

}

  render() {    
    const {oklade,listic,ukupniKef}=this.state
    return (
      <div>
        <div>
      <div>Korisnik</div>
      <div>{user.username}</div>
      <div>kuna:{this.state.novcanik}</div>
      <button onClick={()=>{this.dodajKune(50)}}>dodaj 50 Kuna</button>
      </div>
      <span>oklade:</span>

      
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
                       koef:{parovi.tip}
                       opis oklade:{parovi.opisTipa}

                      </li>
              
                    </div>)}
                    <span>koef:{ukupniKef}</span>
                    <button onClick={()=>this.brisiListic()}>obrisi listić</button>

      </div>
    );
  }
}