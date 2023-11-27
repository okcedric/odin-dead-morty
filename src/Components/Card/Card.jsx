import './Card.css'
function Card({ morty, handleTouch }) {
  let image = morty.image;
  let divId = 'card-'+morty.id;
  let div = document.getElementById(divId);

  return (
    <div
      id={divId}
      key={morty.id}
      className="card hoverable"
      onClick={() => handleTouch(morty.id)}
      //remove the hoverable effect when touched
      onTouchStart={() =>
        document.getElementById(divId).classList.remove("hoverable")
      }
      //add the hoverable effect when mouse is moving
      onMouseLeave={() =>
        document.getElementById(divId).classList.add("hoverable")
      }
    >
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      <h4 className="name">{morty.name}</h4>
    </div>
  );
}

export default Card;
