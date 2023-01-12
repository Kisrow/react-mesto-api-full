function PopupWithForm({
  name,
  isOpen,
  description,
  buttonDescription,
  onClose,
  children,
  onSubmit,
  isButtonDisabled
  }) {
    return(
      <div className={`popup ${name} ${isOpen ? 'popup_on' : ''}`}>
        <div className="popup__container">
          <button aria-label="закрыть всплывающее окно"
          className="popup__exit" type="button" onClick={onClose}></button>
          <h2 className="popup__paragraph">{description}</h2>
          <form className="popup__forms" name={name} onSubmit={onSubmit} noValidate>
            {children}
            <button className={`popup__button ${isButtonDisabled ? 'popup__button_disabled' : ''}`} type="submit" disabled={isButtonDisabled}>{buttonDescription}</button>
          </form>
          <div className="popup__overlay"></div>
        </div>
      </div>
    )
}
export default PopupWithForm;