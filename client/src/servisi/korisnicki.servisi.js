//import { authHeader } from '../helperi/authHeader';

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
    prikazsvihSlobodnihOklada
   
};
function spremiNovuOkladu(oklada) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oklada)
    };
        console.log(oklada)
    return fetch("http://localhost:8080/api/dodajOkladu", requestOptions).then(odgovor=>{console.log(odgovor)});
   

};

function prikazsvihSlobodnihOklada(){
    return fetch("http://localhost:8080/api/get/allOklade")
    .then(handleResponse)
    }


function odradiUplatu(id){
   

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };
    return fetch("http://localhost:8080/api/odradiUplatu", requestOptions)
    
    .then(odgovor=>{return odgovor})

}


    function prikazsvihUplataZahtjeva(){
        return fetch("http://localhost:8080/api/get/allUplate")
        .then(handleResponse)
        }

    function zahtjevUplate(username,kolicina){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username,kolicina,odradeno:false})
        };
        return fetch("http://localhost:8080/api/zahtjevUplate", requestOptions)
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

        return fetch("http://localhost:8080/api/isAdmin", requestOptions)
        .then(handleResponse)
        .then(odgovor=>{return odgovor})
    }

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("http://localhost:8080/api/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();   
            return user;
        });
};


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
        
    return fetch("http://localhost:8080/api/save", requestOptions).then(handleResponse);
   

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