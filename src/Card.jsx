function Card({ morty, isTouched, handleTouch }) {
  let image = morty.image;

  return (
    <div
      className={isTouched}
      key={morty.id}
      onClick={() => handleTouch(morty.id)}
    >
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      <h4 className="name">{morty.name}</h4>
    </div>
  );
}

export default Card;
