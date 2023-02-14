function ImagePopup(props) {
  const { isOpen, onClose } = props;
  return (
    <div className={isOpen.name ? 'popup popup_opened' : 'popup'}>
      <div className="popup-foto__conteiner">
        <button
          onClick={onClose}
          className="button-close button-close_tepe_foto"
          type="button"
        ></button>
        <img className="popup-foto__foto" src={isOpen.link} alt={isOpen.name} />
        <p className="popup-foto__name-foto">{isOpen.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
