const config = {
  // baseUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'http://kisrow.backend.nomoredomains.rocks',
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

export const getContent = (token) => {
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