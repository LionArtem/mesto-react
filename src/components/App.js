import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCard(!isLiked, card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteImg(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        // тут ловим ошибку
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
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

  // const handleCardClick = (card) => {
  //   setSelectedCard(card);
  // };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .addServerUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (url) => {
    api
      .addServerUserAvatar(url)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const handleAddPlaceSubmit = ({ nameFoto, link }) => {
    api
      .addNewCard({ nameFoto, link })
      .then((userData) => {
        setCards([userData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <>
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
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          onClose={() => closeAllPopups()}
          isOpen={isEditProfilePopupOpen}
        />
        <AddPlacePopup
          onUpdateUser={({ nameFoto, link }) =>
            handleAddPlaceSubmit({
              nameFoto,
              link,
            })
          }
          onClose={() => closeAllPopups()}
          isOpen={isAddPlacePopupOpen}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={() => setIsEditAvatarPopupOpen(false)}
        />
        <ImagePopup onClose={() => closeAllPopups()} isOpen={selectedCard} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
