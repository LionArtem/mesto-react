import { closeOverley } from '../utils/utils';

function PopupWithForm(props) {
  const { title, isOpen, avatar, children, onClose, onSubmit } = props;

  return (
    <div
      onClick={(evt) => closeOverley(evt, onClose)}
      className={isOpen ? 'popup  popup_opened' : 'popup'}
    >
      <div className="popup__container">
        <button
          className="button-close button-close_tepe_elements"
          type="button"
          onClick={onClose}
        ></button>
        <p className="popup__edit-profile">{title}</p>
        <form
          onSubmit={onSubmit}
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
