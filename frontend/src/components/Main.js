import {useContext, useEffect, useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddCard,
  cards,
  onCardClick,
  onCardLike,
  onCardTrash
}) {
  
  //подписака на контекст
  const infoCurrentUserContext = useContext(CurrentUserContext);

  return(
    <main>
        {/* <!--* секция отвечает за профиль: ФИО, род деятельности и аватарку--> */}
      <section className="profile">
        <img className="profile__avatar" src={infoCurrentUserContext.avatar}
          alt="извините, браузер не выдержал всю мощь вашей фотографии" />
        <button aria-label="открыть окно ввода ссылки на новый аватар профиля"
          className="profile__avatar-edite" type="button" onClick={onEditAvatar}></button>
          <div>
          <div className="profile__info">
            <h1 className="profile__name">{infoCurrentUserContext.name}</h1>
            <button aria-label="открыть окно ввода новой информации профиля"
            className="profile__editor" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{infoCurrentUserContext.about}</p>
        </div>
        <button aria-label="открыть окно ввода для добавления новой картинки"
        className="profile__add-button" type="button" onClick={onAddCard}></button>
      </section>
      {/* <!--* секция, отвечающая за ленту с карточками, --> */}
      <section className="feed">
        <ul className="feed__elements">
          {cards.map(card => (
            <Card 
              card={card}
              linkCard={card.link}
              nameCard={card.name}
              likesCard={card.likes}
              key={card._id}
              onSelectedCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardTrash={onCardTrash}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
export default Main;