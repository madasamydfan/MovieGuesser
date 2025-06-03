import PropTypes from 'prop-types';
import '../css/clueCard.css'
import '../css/overlay.css'
function Clue({clueNo,clueText,setShowClue}){
    return (
        <div className="clue-overlay">
          <button className="close-btn" onClick={() => setShowClue(false)}>
            ×
          </button>
          <div className="cluecard">
            <h1 className="ClueHeading">CLUE {clueNo}</h1>
            <p className="clueText">{clueText}</p>
          </div>
        </div>

    )
}

export default Clue;