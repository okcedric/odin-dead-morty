function Board({ hiScore, currentScore, hasBeatGame }) {
  const medal = hasBeatGame && <span>(max)</span>;

  return (
    <div className="board">
      <div className="currentScore"> Current Score : {currentScore} </div>
      <div className="hiScore">
        {" "}
        Hi Score : {hiScore} {medal}{" "}
      </div>
    </div>
  );
}

export default Board;
