import React from 'react';
import Card from './Card';

import { api } from '../utils/Api';

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then(([userData, cardsData]) => {
        // console.log(cardsData);
        // тут установка данных пользователя
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);
        // и тут отрисовка карточек
        setCards(cardsData);
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__conteiner">
          <div className="profile__pencil-avatar"></div>
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-li">
            <h1 className="profile__title">{userName}</h1>
            <h2 className="profile__subtitl">{userDescription}</h2>
          </div>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          >
            <img
              className="profile__pencil"
              src="/images/pencil.png"
              alt="карандаш"
            />
          </button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        >
          <img className="profile__plus" src="/images/plus.png" alt="плюс" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
