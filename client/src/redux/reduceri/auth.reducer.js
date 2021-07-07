import  {userKonstante}  from '../konstante/korisnicke.konstante';
let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};


export function authentication(state = initialState, action) {
    switch (action.type) {
      case userKonstante.LOGIN_ZAHTJEV:
        
        return {
          loggingIn: true,
          
          user: action.user
        };
      case userKonstante.LOGIN_PROSAO:
        
        return {
          loggedIn: true,
          user: action.user
        };
      case userKonstante.LOGIN_FAILURE:
        return {};
      case userKonstante.LOGOUT:
        return {};
      default:
        return state
    }
  }