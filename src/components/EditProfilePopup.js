import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile"
      buttonText="сохранить"
    >
      <input
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
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
        onChange={(e) => setDescription(e.target.value)}
        value={description || ''}
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
    </PopupWithForm>
  );
}
