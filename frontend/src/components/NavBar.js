import {useHistory, useRouteMatch} from 'react-router-dom';

function NavBar({userEmail, signOut, loggedIn}) {
  const history = useHistory();
  const matchSignIn = useRouteMatch("/sign-in");

  function changeMatchSignUp () {
    history.push("/sign-up");
  }

  function changeMatchSignIn() {
    history.push("/sign-in");
  }

  return(
    <ul className="navbar">
      <li><h2 className="navbar__text">{userEmail}</h2></li>
      {loggedIn ?
        <li><button className="navbar__link navbar__button" onClick={signOut}>Выйти</button></li>
      :
        matchSignIn ?
          <li><button className="navbar__link navbar__button" onClick={changeMatchSignUp}>Регистрация</button></li>
        :
          <li><button className="navbar__link navbar__button" onClick={changeMatchSignIn}>Войти</button></li>
        
      }

    </ul>
  )
}
export default NavBar;