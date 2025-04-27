import { useNavigate } from "react-router-dom";
function HomePage(){
    const navigate = useNavigate();
    const handlegetstarted = ()=>{
        navigate('/movieguess')
    }
    return (
        <>
        <h1>Movie Guesser</h1>
        <button onClick={handlegetstarted}>Get Started</button>
    </>
    )
}

export default HomePage;