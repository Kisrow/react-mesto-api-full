import { useEffect, useState } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();

  //хуки
  //хуки отвечающие за состояние попапов - вкл/выкл
  const [isPopupEditAvatarActive, setPopupEditAvatarActive] = useState(false);
  const [isPopupEditProfileActive, setPopupEditProfileActive] = useState(false);
  const [isPopupAddCardActive, setPopupAddCardActive] = useState(false);
  const [isPopupDeleteCardActive, setPopupDeleteCardActive] = useState(false);
  const [isPopupImageActive, setPopupImageActive] = useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = useState(false);
  //хук хранит выбранную карточку
  const [selectedCard, setSelectedCard] = useState({});
  //хук хранит информацию с серва о пользователе, обновляется api.getUserInfo
  const [currentUser, setCurrentUser] = useState({});
  //хук хранит информацию с серва о карточках, обновляется api.getCards
  const [cards, setCards] = useState([]);
  //хук хранит состояния пользователя, авторизован или нет
  const [loggedIn, setLoggedIn] = useState(false);
  //хук хранит email авторизованного пользователя (отображен в header)
  const [userEmail, setUserEmail] = useState('');

  const [isRegisterOk, setRegisterOk] = useState(false);

  function onLogin(loginEmail, loginPassword) {
    auth.authorize(loginEmail, loginPassword)
      .then((res => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          history.push("/main");
        }
      }))
      .catch(err => console.log(err))
  }

  function onRegister(registerEmail, registerPassword) {
    auth.register(registerEmail, registerPassword)
      .then(data => {
        if (data) {
          setRegisterOk(true);
          history.push('/sign-in');
        }
      })
      .catch(err => {
        setRegisterOk(false)
        console.log(err);
      })
      .finally(() => setInfoTooltipActive(true));
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    auth.getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          setCurrentUser(res);
          history.push("/main");
        } else {
          setLoggedIn(false);
        }
      })
      .catch(err => console.log(err));
  }
  
  function signOut() {
    auth.logOut()
      .then((res) => {
        setLoggedIn(false);
        setUserEmail('');
        history.push("/sign-in");
      })
  }

  //эффект при мониторинии, запрашивает с серва инфу о пользователе и меняет сейт-переменную
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then (([userData, serverCards]) => {
        setCurrentUser(userData);
        setCards(serverCards);
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn])

  //закрытие любого попапа
  function closeAllPopups() {
    setPopupEditAvatarActive(false); 
    setPopupEditProfileActive(false); 
    setPopupAddCardActive(false); 
    setPopupDeleteCardActive(false);
    setPopupImageActive(false);
    setInfoTooltipActive(false);
  }
  //меняет стейт-переменную, где хранится значение true/false на открытие попапа - смены аватара
  function handleEditAvatarClick() {
    setPopupEditAvatarActive(true);
  }
  //меняет стейт-переменную, где хранится значение true/false на открытие попапа - смены имени и 'о себе' пользователя
  function handleEditProfileClick() {
    setPopupEditProfileActive(true);
  }
  //меняет стейт-переменную, где хранится значение true/false на открытие попапа - добавление новой карточки
  function handleAddCardClick() {
    setPopupAddCardActive(true);
  }
  //меняет стейт-переменную, где хранится значение true/false на открытие попапа - подтверждения удаления карточки
  function handleCardTrashClick(card) {
    setPopupDeleteCardActive(true);
    setSelectedCard(card);
  }
  //меняет стейт-переменную, где хранится значение true/false на открытие попапа - просмотр фото в оригинальном размере
  function handleCardClick(card) {
    setPopupImageActive(true);
    setSelectedCard(card);
  }

  //на сервере и локально меняет инфу о пользователе (имя, 'о себе')
  function handleUpdateUser({name, about}) {
    api.patchEditProfileInformation({name, about})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //на сервере и локально меняет аватар пользователя
  function handleUpdateAvatar({avatar}) {
    api.patchAvatarProfile({avatar})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //на сервере и локально добавляет новую карточку
  function handleAddPlaceSubmit({name, link}) {
    api.postNewCard({name, link})
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //При клике на лайк отправка на сервер смены статуса лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  //При клике на мусорку удаляет карточку
  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(selectedCard._id)
      .then(res => {
        setCards(cards.filter(item => item._id !== selectedCard._id)); // копия массива, исключив из него удалённую карточку, res - возвращает смс пост удален
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header 
          userEmail={userEmail}
          signOut={signOut}
          loggedIn={loggedIn}
          />
          <Switch>
            <Route path="/sign-in">
              <Login 
              onLogin={onLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register 
                onRegister={onRegister}
              />
            </Route>
            <ProtectedRoute 
              path="/main"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardTrash={handleCardTrashClick}
            />
            <Route exact path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isInfoTooltipActive}
            onClose={closeAllPopups}
            isRegisterOk={isRegisterOk}
          />

          {/* окно редактирования профиля */}
          <EditProfilePopup
            isOpen={isPopupEditProfileActive}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* окно добавления новой карточки */}
          <AddPlacePopup
            isOpen={isPopupAddCardActive}
            onClose={closeAllPopups}
            onPostNewCard={handleAddPlaceSubmit}
          />
          {/* окно смены аватара */}
          <EditAvatarPopup
            isOpen={isPopupEditAvatarActive}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* окно подтверждения удаления карточки */}
          <ConfirmDeletePopup
            isOpen={isPopupDeleteCardActive}
            onClose={closeAllPopups}
            handleCardDelete={handleCardDelete}
          />
          {/* окно просмотра фото карточки */}
          <ImagePopup
            onClose={closeAllPopups} 
            card={selectedCard}
            isOpen={isPopupImageActive}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
