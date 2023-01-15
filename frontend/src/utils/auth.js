import BASE_URL from './constants';

const config = {
  baseUrl: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => { 
  if (res.ok) { 
    return res.json();
  } 
  return Promise.reject(`Произошла ошибка ${res.status}`); 
};

export const register = (email, password) => {
  return fetch(`${config.baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: config.headers,
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${config.baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: config.headers,
    body: JSON.stringify({email, password})
  })
  .then(checkResponse);
}

export const getContent = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}

export const logOut = () => {
  return fetch(`${config.baseUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(checkResponse);
}