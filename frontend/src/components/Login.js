import { useState } from 'react';

function Login({
  onLogin
  }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
      setEmail(e.target.value);
    }
    
    function handleChangePassword(e) {
      setPassword(e.target.value);
    }
    
    //введеные email и пароль на сервер, если они есть в базе (зарегистрирован пользователь с таким email и паролем), то возвращает токен
    //сохраняет токен в хранилище
    function handleSubmit(e) {
      e.preventDefault();
      onLogin(email, password);
  }

  return(
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__container">
        <h2 className="form__paragraph">Вход</h2>
        <input className="form__input" value={email || ''} onChange={handleChangeEmail} type="email" placeholder="Email" required></input>
        <span className="form__input-error"></span>
        <input className="form__input" value={password || ''} onChange={handleChangePassword} type="password" placeholder="Пароль" required></input>
        <span className="form__input-error"></span>
      </fieldset>
      <button className="form__button" type="submit">Войти</button>
    </form>
  )
}
export default Login;