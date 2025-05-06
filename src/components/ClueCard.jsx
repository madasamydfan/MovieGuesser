import PropTypes from 'prop-types';
import '../css/cluecard.css'
function Cluecard(props){
    return (

        <div className="cluecard">
            <h1 className='ClueHeading'>CLUE {props.clueNo}</h1>
            <p className='clueText'>
               {props.text}
            </p>
        </div>

    )
}

export default Cluecard;