import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
 
function AddPlacePopup({
  isOpen,
  onClose,
  onPostNewCard
  }) {

    //сейт-переменные содержащие имя и адрес новой карточки
    const [nameCard, setNameCard] = useState('');
    const [link, setLink] = useState('');

    //Обработчики изменения инпутов обновляют стейты
    function handleChangeNameCard(e) {
      setNameCard(e.target.value);
      setIsNameCardValid(e.target.validity.valid);
      setNameCardValiditionMessage(e.target.validationMessage);
    }
    function handleChangeLink(e) {
      setLink(e.target.value);
      setIsLinkValid(e.target.validity.valid);
      setLinkValiditionMessage(e.target.validationMessage);
    }

    //запрет браузеру на переход по адресу формы и и передача управляемых компонентов во внешний обработчик
    function handleSubmit(e) {
      e.preventDefault();

      onPostNewCard({
        name: nameCard, 
        link
      });
    }

    //'чистая' форма при открытии
    useEffect(() => {
      setNameCard('');
      setIsNameCardValid(false);
      setNameCardValiditionMessage('');
      setLink('');
      setIsLinkValid(false);
      setLinkValiditionMessage('');
    }, [isOpen])

    //!Валидация
    //стейт-переменная состояния validity инпутов
    const [isNameCardValid, setIsNameCardValid] = useState(false);
    const [isLinkValid, setIsLinkValid] = useState(false);
    //стейт-переменная validitionMessage инпутов
    const [nameCardValiditionMessage, setNameCardValiditionMessage] = useState('');
    const [linkValiditionMessage, setLinkValiditionMessage] = useState('');
    //валидна ли вся форма
    const isFormValid = isNameCardValid && isLinkValid;
 

    return(
      <PopupWithForm
        name="add-card"
        isOpen={isOpen}
        description="Новое место"
        buttonDescription="Создать"
        onClose={onClose}
        onSubmit={handleSubmit}
        isButtonDisabled={!isFormValid}
      >
        <input className="popup__input" value={nameCard} onChange={handleChangeNameCard} id="nameCard-input" placeholder="Укажите название картинки" type="text" name="nameCard" required minLength="2" maxLength="30" />
        <span className={`nameCard-input-error popup__input-error ${isNameCardValid ? '' : 'popup__input-error_visible'}`}>{nameCardValiditionMessage}</span>
        <input className="popup__input" value={link} onChange={handleChangeLink} id="link-input" placeholder="Введите ссылку на картинку" type="url" name="link" required />
        <span className={`link-input-error popup__input-error ${isLinkValid ? '' : 'popup__input-error_visible'}`}>{linkValiditionMessage}</span>
      </PopupWithForm>
    )
}
export default AddPlacePopup;