import { useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card,
  onSelectedCardClick,
  onCardLike,
  linkCard,
  nameCard,
  likesCard,
  onCardTrash
}) {

  //подписака на контекст
  const infoCurrentUserContext = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  console.log(card.owner._id);
  console.log(infoCurrentUserContext._id);
  const isOwn = card.owner === infoCurrentUserContext._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`feed__element-trash ${isOwn ? 'feed__element-trash_visible' : 'feed__element-trash_hidden'}`);

  //Определяем лайкали ли мы эту карточку
  const isLiked = card.likes.some(i => i._id === infoCurrentUserContext._id);

  //Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeClassName = (`feed__element-like ${isLiked ? 'feed__element-like_active' : ''}`);

  function handleClick() { 
    onSelectedCardClick(card); 
  } 

  function handleClickLike() {
    onCardLike(card);
  }

  function handleCardTrashClick() {
    onCardTrash(card);
  }
  return(
    <li className="feed__element">
      <img className="feed__element-photo" src={linkCard} alt={nameCard} onClick={handleClick}/>
      <button aria-label="удаление карточки" className={cardDeleteButtonClassName} type="button" onClick={handleCardTrashClick}></button>
      <div className="feed__element-footer">
        <h3 className="feed__element-pharagraph">{nameCard}</h3>
        <div>
          <button aria-label="поставить фотографии лайк"
          className={cardLikeClassName} type="button" onClick={handleClickLike}></button>
          <h3 className="feed__element-counter">{likesCard.length}</h3>
        </div>
      </div>
    </li>
  )
}
export default Card;