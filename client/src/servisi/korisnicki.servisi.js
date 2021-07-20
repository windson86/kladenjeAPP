
import { Redirect } from 'react-router-dom';
export const userService = {
    register,
    logout,
    login,
    isAdmin,
    getAccInfo,
    zahtjevUplate,
    prikazsvihUplataZahtjeva,
    odradiUplatu,
    spremiNovuOkladu,
    prikazsvihSlobodnihOklada,
    izracunOklade,
    igrajListic
   
};
function igrajListic(ulog,parovi,koef,id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ulog,parovi,koef,id})
    };
    return fetch("/api/igrajListic", requestOptions).then(handleResponse);
}

function izracunOklade(oklada){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oklada)
    };
   
    return fetch("/api/izracunajOkladu", requestOptions).then(handleResponse);
}

function spremiNovuOkladu(oklada) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oklada)
    };
        console.log(oklada)
    return fetch("/api/dodajOkladu", requestOptions).then(handleResponse);
   

};

function prikazsvihSlobodnihOklada(){
    return fetch("/api/get/allOklade")
    .then(handleResponse)
    }


function odradiUplatu(id){
   

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };
    return fetch("/api/odradiUplatu", requestOptions)
    
    .then(odgovor=>{return odgovor})

}


    function prikazsvihUplataZahtjeva(){
        return fetch("/api/get/allUplate")
        .then(handleResponse)
        }

    function zahtjevUplate(username,kolicina){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username,kolicina,odradeno:false})
        };
        return fetch("/api/zahtjevUplate", requestOptions)
        .then(handleResponse)
        .then(odgovor=>{return odgovor})

    }

    function getAccInfo(id){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        return fetch("/api/getAccbyID", requestOptions)
        .then(handleResponse)
        .then(odgovor=>{return odgovor})
    }

    function isAdmin(id){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };

        return fetch("/api/isAdmin", requestOptions)
        .then(handleResponse)
        .then(odgovor=>{return odgovor})
    }

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("/api/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            
            localStorage.setItem('user', JSON.stringify(user));
            <Redirect to='/home' />
          
            return user;
        });
};


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
        
    return fetch("/api/save", requestOptions).then(handleResponse);
   

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;

    });
}

function logout() {
    
    localStorage.removeItem('user');
}