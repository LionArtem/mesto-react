function Card(props) {
  const { card, onCardClick } = props;
  return (
    <div className="element">
      <button className="element__delete" type="button"></button>
      <img
        onClick={() => onCardClick(card.link, card.name)}
        className="element__foto"
        src={card.link}
        alt="замок"
      />
      <div className="element__signature">
        <p className="element__name-foto">{card.name}</p>
        <div>
          <button className="element__like" type="button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
