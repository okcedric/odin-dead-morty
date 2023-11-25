import './Overlay.css'

function Overlay({isGameOver,isGameBeaten,currentScore,retry}){
    
    let overlay = null;

    if (isGameOver) {
       overlay = (
            <div className="overlay">
            <h2>Game Over</h2>
            <h3>
                You probably did better than {currentScore} in an alternate universe ...{" "}
            </h3>
            <button onClick={retry}>Retry</button>
            </div>
        );
        }

        if (isGameBeaten) {
       overlay = (
         <div className="overlay">
           <h2>You beat the game !</h2>
           <h3>Congratulations ...</h3>
           <h3>
             "Nobody exists on purpose. Nobody belongs anywhere. We’re all going
             to die."
           </h3>
           <button onClick={retry}>Retry</button>
         </div>
       );
    }

    return overlay
}
export default Overlay;