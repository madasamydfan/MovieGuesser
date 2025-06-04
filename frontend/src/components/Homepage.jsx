import { useNavigate } from "react-router-dom";

import '../css/Homepage.css';

function Homepage(){
    const navigate = useNavigate();
    const handlegetstarted = async()=>{
        navigate('/Instructions')
       // navigate('/movieguess')
    }
    return (
        <>
        <div className="movie-guess-container">
        <h1>Movie Guesser</h1>
        <button className="start-button" onClick={handlegetstarted}>Aarambikalaama <span className="dots"></span></button>
        </div>
    </>
    )
}

export default Homepage;