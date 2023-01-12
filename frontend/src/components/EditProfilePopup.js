import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {
  //стейт, в котором содержится значение инпута name
  const [name, setName] = useState('');
  //стейт, в котором содержится значение инпута job
  const [description, setDescription] = useState('');

  //Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setName(e.target.value);
    setIsNameValid(e.target.validity.valid);
    setNameValiditionMessage(e.target.validationMessage);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setIsDescriptionValid(e.target.validity.valid);
    setDescriptionValiditionMessage(e.target.validationMessage);
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  //запрет браузеру на переход по адресу формы и и передача управляемых компонентов во внешний обработчик
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name.trim(),           //форма не отправляется если ввели только пробелы, надо бы как-то до этого дезактивировать кнопку отправки
      about: description.trim(),
    });
  }

  //!Валидация
  //стейт-переменная состояния validity инпутов
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  //стейт-переменная validitionMessage инпутов
  const [nameValiditionMessage, setNameValiditionMessage] = useState('');
  const [descriptionValiditionMessage, setDescriptionValiditionMessage] = useState('');
  //валидна ли вся форма
  const isFormValid = isNameValid && isDescriptionValid;


  return(
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      description="Редактировать профиль"
      buttonDescription="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={!isFormValid}
    >
      <input className="popup__input" value={name || ''} onChange={handleChangeName} id="name-input" placeholder="Введите имя" type="text" name="name" required minLength="2" maxLength="40" />
      <span className={`name-input-error popup__input-error ${isNameValid ? '' : 'popup__input-error_visible'}`}>{nameValiditionMessage}</span>
      <input className="popup__input" value={description || ''} onChange={handleChangeDescription} id="job-input" placeholder="Расскажите о себе" type="text" name="job" required minLength="2" maxLength="200" />
      <span className={`job-input-error popup__input-error ${isDescriptionValid ? '' : 'popup__input-error_visible'}`}>{descriptionValiditionMessage}</span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;