import PropTypes from 'prop-types';
function ClueCard(props){
    return (

        <div className="cluecard">
            <h2 className='ClueHeading'>CLUE : {props.clueNo}</h2>
            <p className='clueText'>
               {props.text}
            </p>
        </div>

    )
}

export default ClueCard;