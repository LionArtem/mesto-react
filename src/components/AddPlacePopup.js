import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ onClose, isOpen, onUpdateUser }) {
  const [nameFoto, setNameFoto] = React.useState('');
  const [link, setlink] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      nameFoto,
      link,
    });
  };
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Новое место"
      name="elements"
    >
      <input
        value={nameFoto}
        onChange={(e) => setNameFoto(e.target.value)}
        name="nameFoto"
        id="title-input"
        className="popup__info-text popup__info-text_type_title"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <p className="title-input-error popup__input-error"></p>
      <input
        value={link}
        onChange={(e) => setlink(e.target.value)}
        name="link"
        id="fotolink-input"
        className="popup__info-text popup__info-text_type_fotolink"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <p className="fotolink-input-error popup__input-error"></p>
      <button
        className="popup__save-button popup__save-button_add-foto"
        type="submit"
      >
        Создать
      </button>
    </PopupWithForm>
  );
}
