import { userKonstante } from '../konstante/korisnicke.konstante';
import { userService } from '../../servisi/korisnicki.servisi';

import { history } from '../../helperi/history';



export const userActions = {
    logout,
    login,
    register,
    isADMIN
  
};

function isADMIN(token){
    return dispatch =>{
        
        userService.isAdmin(token)
        .then(() =>dispatch(success()))



    }
    function success(token) { return { type: "TOKEN_PROVJERA", token } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    window.location.reload();
                    
                },
                error => {
                    dispatch(failure(error));
                  
                }
            );
    };

    function request(user) { return { type: userKonstante.REGISTER_REQUEST, user } }
    function success(user) { return { type: userKonstante.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userKonstante.REGISTER_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log("dobiveni koriswnik",user)
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error));
                    
                }
            );
    };

    function request(user) { return { type: userKonstante.LOGIN_ZAHTJEV, user } }
    function success(user) { return { type: userKonstante.LOGIN_PROSAO, user } }
    function failure(error) { return { type: userKonstante.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userKonstante.LOGOUT };
}