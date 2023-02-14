function PopupWithForm(props) {
  const { title, isOpen, avatar, children, onClose } = props;

  return (
    <div className={isOpen ? 'popup  popup_opened' : 'popup'}>
      <div className="popup__container">
        <button
          className="button-close button-close_tepe_elements"
          type="button"
          onClick={onClose}
        ></button>
        <p className="popup__edit-profile">{title}</p>
        <form
          className={`popup__form popup__form_type_${avatar}`}
          name={avatar}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
