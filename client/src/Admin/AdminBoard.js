import React from 'react';
import { userService } from '../servisi/korisnicki.servisi';
let user = JSON.parse(localStorage.getItem('user')) || [];

export default class AdminBoard extends React.Component {

    constructor(props) {
      super(props);
  
  
  
      this.state = {
        oklade:[],
        oklada: {
          opisOklade: '',
         sanse:[],
         tipovi:[],
      },
       brojIshoda:2,
        uplate:[],
        isAdmin:false,
      
      };
      this.handleChange = this.handleChange.bind(this);
      this.izmjeniSanse=this.izmjeniSanse.bind(this);
      this.handleSpremanjeOklade = this.handleSpremanjeOklade.bind(this);
      this.izmjeniTipove=this.izmjeniTipove.bind(this);
  }
  componentDidMount() {
    userService.isAdmin(user.id).then(odgovor=>{this.setState({isAdmin:odgovor.admin})})
    userService.prikazsvihSlobodnihOklada().then(odgovor=>{this.setState({oklade:odgovor})})
    userService.prikazsvihUplataZahtjeva().then(odgovor=>{this.setState({uplate:odgovor})})



}
handleChange(e) {
  const { name, value } = e.target;
  const { oklada } = this.state;
        this.setState({
            oklada: {
                ...oklada,
                [name]: value
            }
        });
}
izmjeniSanse(e){
    const { name, value } = e.target;
    const { oklada } = this.state;

   
    let sanse=[...this.state.oklada.sanse];
    let sansa={...sanse[name]}
    sansa=parseInt(value)
    sanse[name]=sansa
    this.setState({oklada:{
        ...oklada,
        sanse:sanse
    }})

}
izmjeniTipove(e){
    const { name, value } = e.target;
    const { oklada } = this.state;

    
    let tipovi=[...this.state.oklada.tipovi];
    let tip={...tipovi[name]}
    tip=value
    tipovi[name]=tip
    this.setState({oklada:{
        ...oklada,
        tipovi:tipovi
    }})

}

handleUplatu(id) {
   
   
    userService.odradiUplatu(id).then(res=>{console.log(res)})

}
izracunajOkladu(oklada) {
 userService.izracunOklade(oklada).then(odgovor=>{console.log("respond servera:",odgovor)})
}

handleBrisanjeUplate(id) {
    
    

}

handleSpremanjeOklade(){

const {oklada}=this.state

userService.spremiNovuOkladu(oklada).then(res=>{alert(res.poruka)})

}
izmjeniBrojIshoda(name){

if(name==="minus"){this.setState({brojIshoda:this.state.brojIshoda-1})}
if(name==="plus"){this.setState({brojIshoda:this.state.brojIshoda+1})}
}

rendirajMultiOklade(){
    const povratak=[];
    const {oklada,brojIshoda} = this.state;
    for (let index = 0; index < brojIshoda; index++) {
       
    povratak.push( <div>
       <div> 
       <label>šansa za tip {index+1}</label>
           <input type="number" className="form-control" name={index} value={oklada.sanse[index]} onChange={this.izmjeniSanse} />
        
        </div>
        <label>opis tipa {index+1}</label>
        <input type="text" className="form-control" name={index} value={oklada.tipovi[index]} onChange={this.izmjeniTipove} />
        
        </div>

        
        )}
  return povratak
}

test(){
    userService.test().then(res=>alert(res.poruka))
}

render() {    
    
    const {
        uplate,
        isAdmin,
        oklada,
        oklade,
       
    } = this.state

    return (
      <div>
      <div>ADMIN</div>
{
    isAdmin && <div>
    <span>oklade:</span>

      
    <ul>
    {oklade.map((oklade, index) =>
            <div>
         <li key={oklade._id}>
        {oklade.opisOklade}
     <span> - {oklade.dobitniTip}
     randomirano: {oklade.tipovi[oklade.dobitniIndex]}
                <button onClick={()=>this.izracunajOkladu(oklade)}>izračunaj</button>
     </span>
        </li>
             </div>
            )}
    </ul>
    <button onClick={()=>this.test()}>test</button>
    <ul>

    {uplate.map((uplate, index) =>
         <div>{
            !uplate.odradeno&& 
            <li key={uplate._id}>
                {uplate.username + ' ' + uplate.kolicina+'kn'}
                <span> - <button onClick={()=>this.handleUplatu(uplate._id)}>Uplati</button>
                        <button onClick={()=>this.handleBrisanjeUplate(uplate._id)}>Obrisi</button>
                </span>
            </li>}
        </div>
        )}
    </ul>
 </div>}
      Upis nove oklade:
                   
                    <div className='group'>
                        <label htmlFor="opisOklade">opis oklade</label>
                        <input type="text" className="form-control" name="opisOklade" value={oklada.opisOklade} onChange={this.handleChange} />
                        
                    </div>
                   {this.state.brojIshoda<4 && <button name="plus" onClick={()=>this.izmjeniBrojIshoda("plus")}>+</button>}<span>broj ishoda:{this.state.brojIshoda}</span>{this.state.brojIshoda>1&&<button name="minus" onClick={()=>this.izmjeniBrojIshoda("minus")}>-</button>}
                    {this.rendirajMultiOklade()}
                    <div className="group">
                        <button onClick={()=>this.handleSpremanjeOklade()} className="btn btn-primary">spremi Okladu</button>
                       
                        
                    </div>
                           
    
      </div>
    );
  }

}