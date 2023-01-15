import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
  }) {

    //записываем объект, возвращаемый хуком, в переменную
    const avatarRef = useRef();
    
    //запрет браузеру на переход по адресу формы и и передача инпута с помощью рефа во внешний обработчик 
    function handleSubmit(e) {
      e.preventDefault();
      
      onUpdateAvatar({
        avatar:avatarRef.current.value
      })

      avatarRef.current.value = '';
    }

    return(
      <PopupWithForm
        name="change-avatar"
        isOpen={isOpen}
        description="Обновить аватар"
        buttonDescription="Обновить"
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input ref={avatarRef} className="popup__input" id="avatar-link-input" placeholder="Введите ссылку на картинку" type="url" name="link" required />
        <span className="avatar-link-input-error popup__input-error"></span>
    </PopupWithForm>
    )
}
export default EditAvatarPopup;