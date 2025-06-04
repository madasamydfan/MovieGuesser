import '../css/ReadName.css'
function ReadName({setName,setshowNameCard,name}){
    return(
        <>
         <div className="name-card">
          <input
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="Username"
          />
          <button
            className="submit-name-button"
            onClick={() => setshowNameCard(false)}
            disabled={!name.trim()}
          >
            Sumbit
          </button>
        </div>
        </>
    )
}

export default ReadName;