import React from 'react';
import { userService } from '../servisi/korisnicki.servisi';
let user = JSON.parse(localStorage.getItem('user')) || [];




export default class Home extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
        novcanik: 0,
        oklade:[]
    };

}

  componentDidMount() {
    userService.getAccInfo(user.id).then(odgovor=>{
      console.log("LOVA:",odgovor.novcanik)
      this.setState({novcanik:odgovor.novcanik})
    })

    userService.prikazsvihSlobodnihOklada().then(odgovor=>{this.setState({oklade:odgovor})})
    
  }
  dodajKune(iznos){
    userService.zahtjevUplate(user.username,iznos)
  }

handleOklada(tip){
  console.log(tip)
}

  render() {    
    const {oklade}=this.state
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
                                <span> - <button onClick={()=>this.handleOklada(oklade.prviIshod)}>{oklade.opisPrvogIshoda}{oklade.prviIshod}</button>
                                     <button onClick={()=>this.handleOklada(oklade.drugiIshod)}>{oklade.opisDrugogIshoda}{oklade.drugiIshod}</button>
                                     
                                     </span>

                                
                               
                            </li>
                            </div>
                        )}
                    </ul>
                    <span>listić:</span>

      </div>
    );
  }
}