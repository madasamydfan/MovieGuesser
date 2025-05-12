import PropTypes from 'prop-types';
import '../css/cluecard.css'
import '../css/overlay.css'
function Cluecard(props){
    return (
        <div className="clue-overlay">
          <button className="close-btn" onClick={() => setShowClue(false)}>
            ×
          </button>
          <div className="cluecard">
            <h1 className="ClueHeading">CLUE {props.clueNo}</h1>
            <p className="clueText">{props.clueText}</p>
          </div>
        </div>

    )
}

export default Cluecard;