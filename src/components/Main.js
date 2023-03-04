import React, { useContext } from 'react';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const { currentUser,cards } = useContext(CurrentUserContext);
  
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__conteiner">
          <div className="profile__pencil-avatar"></div>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-li">
            <h1 className="profile__title">{currentUser.name}</h1>
            <h2 className="profile__subtitl">{currentUser.about}</h2>
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
