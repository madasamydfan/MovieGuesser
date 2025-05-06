import { useNavigate } from "react-router-dom";
import '../css/HomePage.css'
import axios from 'axios';
import Cluecard from './clueCard'

function HomePage(){
    const navigate = useNavigate();
    const handlegetstarted = async()=>{
        navigate('/movieguess')
    }
    return (
        <>
        <div className="movie-guess-container">
        <h1>Movie Guesser</h1>
        <button className="Aramikalaama" onClick={handlegetstarted}>AARAMIKALAAMA <span className="dots"></span></button>
        </div>
        {/* <Cluecard clueNo={1} text ={"hello"}></Cluecard> */}
    </>
    )
}

export default HomePage;