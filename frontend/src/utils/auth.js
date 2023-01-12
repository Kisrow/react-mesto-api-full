const config = {
  baseUrl: 'https://auth.nomoreparties.co',
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
    headers: config.headers,
    body: JSON.stringify({email, password})
  })
  .then(checkResponse);
}

//при использовании config.headers ломается авторизация
export const getContent = (token) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}