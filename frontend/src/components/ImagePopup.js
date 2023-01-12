function ImagePopup(props) {
  return(
    <div className={`popup viewer ${props.isOpen ? 'popup_on' : ''}`}>
      <div className="popup__wrapper">
        <button aria-label="закрыть всплывающее окно"
        className="popup__exit" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <h2 className="popup__paragraph popup__paragraph_type_viewer">{props.card.name}</h2>
      </div>
      <div className="viewer-overlay popup__overlay"></div>
    </div>
  )
}
export default ImagePopup;