import { Redirect } from "react-router-dom";
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
  igrajListic,
  test,
};
async function igrajListic(ulog, parovi, koef, id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ulog, parovi, koef, id }),
  };
  const response = await fetch("/api/igrajListic", requestOptions);
  return handleResponse(response);
}
async function test(nesto) {
  console.log(nesto);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nesto }),
  };
  const response = await fetch("/api/test", requestOptions);
  return handleResponse(response);
}

async function izracunOklade(oklada, user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oklada, user }),
  };

  const response = await fetch("/api/izracunajOkladu", requestOptions);
  return handleResponse(response);
}

async function spremiNovuOkladu(oklada) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(oklada),
  };
  console.log(oklada);
  const response = await fetch("/api/dodajOkladu", requestOptions);
  return handleResponse(response);
}

async function prikazsvihSlobodnihOklada() {
  const response = await fetch("/api/get/allOklade");
  return handleResponse(response);
}

async function odradiUplatu(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };
  const odgovor = await fetch("/api/odradiUplatu", requestOptions);
  return odgovor;
}

async function prikazsvihUplataZahtjeva() {
  const response = await fetch("/api/get/allUplate");
  return handleResponse(response);
}

async function zahtjevUplate(username, kolicina) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, kolicina, odradeno: false }),
  };
  const response = await fetch("/api/zahtjevUplate", requestOptions);
  const odgovor = await handleResponse(response);
  return odgovor;
}

async function getAccInfo(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };
  const response = await fetch("/api/getAccbyID", requestOptions);
  const odgovor = await handleResponse(response);
  return odgovor;
}

async function isAdmin(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };

  const response = await fetch("/api/isAdmin", requestOptions);
  const odgovor = await handleResponse(response);
  return odgovor;
}

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch("/api/login", requestOptions);
  const user = await handleResponse(response);
  localStorage.setItem("user", JSON.stringify(user));
  <Redirect to="/home" />;
  window.location.reload();
  return user;
}

async function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch("/api/save", requestOptions);
  return handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
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
  localStorage.removeItem("user");
}
