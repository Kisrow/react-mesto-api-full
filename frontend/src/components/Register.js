import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__container">
        <h2 className="form__paragraph">Регистрация</h2>
        <input className="form__input" value={email || ''} onChange={handleChangeEmail} type="email" placeholder="Email" required></input>
        <span className="form__input-error"></span>
        <input className="form__input" value={password || ''} onChange={handleChangePassword} type="password" placeholder="Пароль" required></input>
        <span className="form__input-error"></span>
      </fieldset>
      <button className="form__button" type="submit">Зарегистрироваться</button>
      <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link"> Войти</Link></p>
      
    </form>
  )
}
export default Register;