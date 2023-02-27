import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
//import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCard(!isLiked, card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteImg(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards()])
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then(([cardsData]) => {
        setCards(cardsData);
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
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

  const handleUpdateUser = ({ name, about }) => {
    api
      .addServerUserInfo({ name, about })
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCurrentUser(userData);
        handleEditProfileClick();
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (url) => {
    //console.log(url);
    api
      .addServerUserAvatar(url)
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCurrentUser(userData);
        handleEditAvatarClick();
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleAddPlaceSubmit = ({ nameFoto, link }) => {
    //console.log(url);
    api
      .addNewCard({ nameFoto, link })
      // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCards([userData, ...cards]);
        handleAddPlaceClick();
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  return (
    <div>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleCardLike,
          cards,
          setCards,
          handleCardDelete,
        }}
      >
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={(card) => handleCardClick(card)}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={({ name, about }) => handleUpdateUser({ name, about })}
          onClose={handleEditProfileClick}
          isOpen={isEditProfilePopupOpen}
        />
        <AddPlacePopup
          onUpdateUser={({ nameFoto, link }) =>
            handleAddPlaceSubmit({
              nameFoto,
              link,
            })
          }
          onClose={handleAddPlaceClick}
          isOpen={isAddPlacePopupOpen}
        />
        <EditAvatarPopup
          onUpdateAvatar={(url) => handleUpdateAvatar(url)}
          isOpen={isEditAvatarPopupOpen}
          onClose={handleEditAvatarClick}
        />
        <ImagePopup onClose={() => handleCardClick({})} isOpen={selectedCard} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
