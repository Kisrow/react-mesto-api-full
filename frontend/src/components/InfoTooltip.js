import tooltipOk from '../images/tooltip-ok.svg';
import tooltipError from '../images/tooltip-error.svg';

function InfoTooltip({isOpen, onClose, isRegisterOk}) {
  return(
    <div className={`popup ${isOpen ? 'popup_on' : ''}`}>
      <div className="popup__tooltip">
        <button aria-label="закрыть всплывающее окно"
        className="popup__exit" type="button" onClick={onClose}></button>
        <img className="popup__tooltip-image" src={isRegisterOk ? tooltipOk : tooltipError} alt={`${isRegisterOk ? 'регистрация успешна' : 'ошибка регистрации'}`} />
        <h2 className="popup__tooltip-text">{`${isRegisterOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!' }`}</h2>
      </div>
      <div className="popup__overlay"></div>
    </div>
  )
}
export default InfoTooltip;