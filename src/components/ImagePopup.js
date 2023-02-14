function ImagePopup(props) {
  const { isOpen, link, name, offPopup } = props;
  return (
    <div className={isOpen}>
      <div className="popup-foto__conteiner">
        <button
          onClick={offPopup}
          className="button-close button-close_tepe_foto"
          type="button"
        ></button>
        <img className="popup-foto__foto" src={link} alt="замок" />
        <p className="popup-foto__name-foto">{name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
