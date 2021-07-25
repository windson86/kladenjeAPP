import React from 'react';
import { userService } from '../servisi/korisnicki.servisi';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row ,Card, ListGroup, ListGroupItem} from 'react-bootstrap';

let user = JSON.parse(localStorage.getItem('user')) || [];




export default class Home extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
      ulog:0,
      porez:0.2,
      ukupniKef:1,
        sviListici:[],
        novcanik: 0,
        oklade:[],
        listic:[],
        parovi:[]
    };
    this.promjenaUloga = this.promjenaUloga.bind(this);
    //this.handleOklada = this.handleOklada.bind(this);
    this.brisiListic = this.brisiListic.bind(this);
}

promjenaUloga(e){
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

  componentDidMount() {
    userService.getAccInfo(user.id).then(odgovor=>{
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
  
  this.setState({
    parovi:[],
    ukupniKef:1
  })
}
igrajListic(){
  const {parovi,ulog,ukupniKef}=this.state
  console.log("igranje",parovi,ulog)
 userService.igrajListic(ulog,parovi,ukupniKef,user.id).then(res=>{console.log(res)})
  
}

dodajParNaListic(oklade,i){
const {parovi}=this.state
var postoji=false;
var jindex = 0;
for (let index = 0; index < parovi.length; index++) {
        if(parovi[index].opisOklade===oklade.opisOklade)
    {postoji=true;jindex=index;break;}
}
  

 if(!postoji) {
this.setState({
 
  ukupniKef:this.state.ukupniKef*100/oklade.sanse[i].toFixed(2)-this.state.porez
})

this.setState( prevState => ({
  parovi: [...prevState.parovi,{
    opisOklade:oklade.opisOklade,
    odigraniTip:oklade.tipovi[i],
    odigraniIndex:i,
    IdOklade:oklade._id,
    koef:(100/oklade.sanse[i]).toFixed(2)-this.state.porez
  }],
  
}),

);}
else{
  // let noviparovi = [...this.state.parovi];
  // let par = {...noviparovi[jindex]};
 
  // par.opisOklade=oklade.opisOklade
  // par.odigraniTip=oklade.tipovi[i]
  // par.odigraniIndex=i
  // par.IdOklade=oklade._id
  // par.koef=(100/oklade.sanse[i]).toFixed(2)-this.state.porez

  // noviparovi[jindex]=par

  // this.setState({
  //   parovi:noviparovi,
  //   ukupniKef:(this.state.ukupniKef-parovi.[jindex].koef)*100/oklade.sanse[i].toFixed(2)
  // })
}


}





  render() {    
   
    const {oklade,ukupniKef,sviListici,ulog,porez,parovi}=this.state
  
    return (
      <Container fluid="md">
     
     <Row>
      
<Col>
        <div>
      <div>Korisnik:{user.username}</div>
      <div>kuna:{this.state.novcanik.toFixed(2)}</div>
      <Button variant="primary" onClick={()=>{this.dodajKune(50)}}>dodaj 50 Kuna</Button>
      </div>
      </Col>
      </Row>
     
     
      <Row>
      <Col>
      <div>oklade:</div>

      
     <ListGroup >
         {oklade.map((oklade, index) =>
        <div>
            <ListGroupItem  key={oklade._id}>
                {oklade.opisOklade}
                    <span> {oklade.sanse.map((sanse,index)=>
                    <Card body >
                    <span className="d-flex justify-content-center">koef  {((100/sanse)-porez).toFixed(2)}
                    <button onClick={()=>this.dodajParNaListic(oklade,index)} value={index}>{oklade.tipovi[index]}</button>
                    </span> 
                    </Card>
                               )}
                                     
                    </span>

                                
                               
              </ListGroupItem>
          </div>
                )}
       </ListGroup>
       </Col>
       <Col>
                    <span>listić:</span>
                    {parovi.map((par,index)=>
                    <div>{par.opisOklade} TIP: {par.odigraniTip} -  koef {par.koef.toFixed(2)}</div>
                    )}
                    <span>koef:{ukupniKef.toFixed(2)}</span>
                    <button onClick={()=>this.brisiListic()}>obrisi listić</button>
                    <input type="number" className="form-control" name="ulog" value={ulog} onChange={this.promjenaUloga} />
                    <button onClick={()=>this.igrajListic()}>odigraj listić</button>
                    </Col>
                    
                      </Row>
            <Row>   
            
      <span>listići:</span>
{sviListici.map((listici,index)=><Card body >
  broj listića: {index+1}<br />
          {listici.parovi.map((parovi,index)=>
          <span>  opis:{parovi.opisOklade}  TIP:{parovi.odigraniIndex} </span>)
           } <br />ulog: {listici.ulog} dobitni:{String(listici.dobitni)} </Card>  
)}


                    </Row>
      </Container>
    );
  }
}