import React from 'react';
  import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
  import Nav from './Nav/nav';
  import Home from './Home/home';
  import {Register} from './Register/register';
  import {Login} from './Login/login';
  import AdminBoard from './Admin/AdminBoard'
 

  export default class App extends React.Component {
    render() {    
      return (
        <div className="App">
          <Router>
            <div>
              <Nav />
              <Switch>
              <Route exact path="/" component={Home} />
                 <Route path="/home" component={Home} />
                 <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/admin" component={AdminBoard} />

                
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }