import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(false);

  const [popupImagLink, setPopupImagLink] = React.useState('');

  const [popupImagName, setPopupImagName] = React.useState('');

  const handleCardClick = (link, name) => {
    if (!selectedCard) {
      setPopupImagName(name);
      setPopupImagLink(link);
      setSelectedCard(!selectedCard);
    }
    setSelectedCard(!selectedCard);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  return (
    <div>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={(link, name) => handleCardClick(link, name)}
      />
      <Footer />
      <PopupWithForm
        offPopup={handleEditProfileClick}
        isOpen={isEditProfilePopupOpen ? 'popup  popup_opened' : 'popup'}
        title="Редактировать профиль"
        name="profile"
      >
        <input
          name="name"
          id="name-input"
          className="popup__info-text popup__info-text_type_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <p className="name-input-error popup__input-error"></p>
        <input
          name="job"
          id="job-input"
          className="popup__info-text popup__info-text_type_job"
          type="text"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <p className="job-input-error popup__input-error"></p>
        <button className="popup__save-button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        offPopup={handleAddPlaceClick}
        isOpen={
          isAddPlacePopupOpen ? 'popup popup_type_avatar popup_opened' : 'popup'
        }
        title="Новое место"
        name="elements"
      >
        <input
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
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen ? 'popup popup_opened' : 'popup'}
        title="Обновить аватар"
        name="avatar"
        offPopup={handleEditAvatarClick}
      >
        <input
          name="linkAvatar"
          id="fotoAvatarlink-input"
          className="popup__info-text popup__info-text_type_fotolink"
          type="url"
          placeholder="Ссылка на аватар"
          required
        />
        <p className="fotoAvatarlink-input-error popup__input-error"></p>
        <button
          className="popup__save-button popup__save-button_add-foto"
          type="submit"
        >
          Сохранить
        </button>
      </PopupWithForm>
      <ImagePopup
        name={popupImagName}
        offPopup={handleCardClick}
        link={popupImagLink}
        isOpen={selectedCard ? 'popup popup_opened' : 'popup'}
      />
    </div>
  );
}

export default App;
