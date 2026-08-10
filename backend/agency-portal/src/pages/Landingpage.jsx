import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>HomeHub Agency Portal</h1>

            <p>
                Agency management made simple.
            </p>

           <button
    type="button"
    onClick={() => {
        console.log("button clicked");
        navigate("/login");
    }}
>
    Agency Login
</button>
        </div>
    );
}

export default LandingPage;