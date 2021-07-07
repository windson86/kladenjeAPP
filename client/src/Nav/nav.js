import React from 'react';
import { Link } from 'react-router-dom'
import { userService } from '../servisi/korisnicki.servisi';
let user = JSON.parse(localStorage.getItem('user')) || [];





export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    

    this.state = {
        isAdmin: false
    };

}

  componentDidMount() {
    userService.isAdmin(user.id).then(odgovor=>{
    
    this.setState({isAdmin:odgovor.admin})
   })
  }
  

  render() {   
    const { isAdmin } = this.state;
    
    console.log("IS ADMIN:",isAdmin)
    return (
      <nav className="Nav">
        <div className="Nav__container">
          <Link to="/" className="Nav__brand">
           
          </Link>

          <div className="Nav__right">
            <ul className="Nav__item-wrapper">
              <li className="Nav__item">
                <Link className="Nav__link" to="/home">Home</Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to="/login">Login</Link>
              </li>
              <li className="Nav__item">
                <Link className="Nav__link" to="/register">Register</Link>
              </li>
              {isAdmin&& <li className="Nav__item">
                <Link className="Nav__link" to="/admin">ADMIN</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}