import './Card.css'
function Card({ morty, handleTouch }) {
  let image = morty.image;

  return (
    <div
      key={morty.id}
      className="card"
      onClick={() => handleTouch(morty.id)}
    >
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      <h4 className="name">{morty.name}</h4>
    </div>
  );
}

export default Card;
