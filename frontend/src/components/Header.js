import NavBar from "./NavBar";
function Header({userEmail, signOut, loggedIn}) {
  return (
    <div className="header">
      <div className="header__logo"></div>
      <NavBar 
      userEmail={userEmail}
      signOut={signOut}
      loggedIn={loggedIn}
      />
    </div>
  )
}
export default Header;