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
          opisPrvogIshoda:"",
          prviIshod:0.5,
          opisDrugogIshoda:"",
          drugiIshod:0.5,
          dobitniTip:""
      },

        uplate:[],
        isAdmin:false,
      
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitOklade = this.handleSubmitOklade.bind(this);
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

handleUplatu(id) {
   
    console.log("Uplata ID:",id)
    userService.odradiUplatu(id).then(res=>{console.log("odgovor na uplatu",res)})

}
izracunajOkladu(oklada) {
 const  id=user.id
    console.log("oklada",id)
    
    userService.izracunOklade(oklada,id).then(odgovor=>{console.log("respond servera:",odgovor)})
}

handleBrisanjeUplate(id) {
    
    console.log("Uplata ID:",id)

}

handleSubmitOklade(e){
e.preventDefault();
const {oklada}=this.state
console.log(oklada)
userService.spremiNovuOkladu(oklada).then(
  odgovor=>{console.log(odgovor)}
)

}

render() {    
    const {
        uplate,
        isAdmin,
        opisOklade,
        prviIshod,
        drugiIshod,
        oklada,
        opisPrvogIshoda,
        opisDrugogIshoda,
        oklade} = this.state

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
                                    <button onClick={()=>this.izracunajOkladu(oklade)}>izračunaj</button>
                                    
                                    </span>

                               
                              
                           </li>
                           </div>
                       )}
                   </ul>
    
    
    
    <ul>
                        {uplate.map((uplate, index) =>
                        <div>{
                          !uplate.odradeno&& <li key={uplate._id}>
                                {uplate.username + ' ' + uplate.kolicina+'kn'}
                                <span> - <button onClick={()=>this.handleUplatu(uplate._id)}>Uplati</button>
                                     <button onClick={()=>this.handleBrisanjeUplate(uplate._id)}>Obrisi</button>
                                     
                                     </span>

                                
                               
                            </li>}
                            </div>
                        )}
                    </ul>
                    </div>}
      
                    <form name="form" onSubmit={this.handleSubmitOklade}> 
                    <div className='form-group'>
                        <label htmlFor="opisOklade">opis</label>
                        <input type="text" className="form-control" name="opisOklade" value={oklada.opisOklade} onChange={this.handleChange} />
                        {!opisOklade &&
                            <div className="help-block">OPIS is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="prviIshod">ishod1</label>
                        <input type="number" className="form-control" name="prviIshod" value={oklada.prviIshod} onChange={this.handleChange} />
                        {!prviIshod &&
                            <div className="help-block">postotak potreban</div>
                        }
                    </div> 
                    <div className='form-group'>
                        <label htmlFor="opisPrvogIshoda">opis ishoda 1</label>
                        <input type="text" className="form-control" name="opisPrvogIshoda" value={oklada.opisPrvogIshoda} onChange={this.handleChange} />
                        {!opisPrvogIshoda &&
                            <div className="help-block">Opis ishoda is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="drugiIshod">ishod2</label>
                        <input type="number" className="form-control" name="drugiIshod" value={oklada.drugiIshod} onChange={this.handleChange} />
                        {!drugiIshod &&
                            <div className="help-block">postotak potreban</div>
                        }
                    </div> 
                    <div className='form-group'>
                        <label htmlFor="opisDrugodIshoda">opis ishoda 2</label>
                        <input type="text" className="form-control" name="opisDrugogIshoda" value={oklada.opisDrugogIshoda} onChange={this.handleChange} />
                        {!opisDrugogIshoda &&
                            <div className="help-block">Opis ishoda is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">spremi Okladu</button>
                       
                        
                    </div>
                    </form>                   
    
      </div>
    );
  }

}