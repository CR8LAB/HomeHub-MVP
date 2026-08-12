import { Outlet } from "react-router-dom";

function PublicLayout(){

    return(

<div>
<header>
HomHub Agency Portal
</header>

<main>

<Outlet />


</main>

<footer>
HomeHub
</footer>

</div>


    )
}

export default PublicLayout;