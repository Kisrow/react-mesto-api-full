import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  onClose,
  isOpen,
  handleCardDelete
  }) {

    return(
      <PopupWithForm
        name="confirmation-delete"
        isOpen={isOpen}
        description="Вы уверены?"
        buttonDescription="Да"
        onClose={onClose}
        onSubmit={handleCardDelete}
      />
    ) 
}
export default ConfirmDeletePopup;