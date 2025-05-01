import { useNavigate } from "react-router-dom";
import '../css/HomePage.css'
function HomePage(){
    const navigate = useNavigate();
    const handlegetstarted = ()=>{
        navigate('/movieguess')
    }
    return (
        <>
        <div className="movie-guess-container">
        <h1>Movie Guesser</h1>
        <button onClick={handlegetstarted}>AARAMIKALAAMA <span className="dots"></span></button>
        </div>
    </>
    )
}

export default HomePage;