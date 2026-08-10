import {BrowserRouter,Routes,Route} from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

function AppRouter(){

    return(

<BrowserRouter>
  <Routes>
    <Route
    path="/"
    element={<LandingPage />}
    />
   <Route
    path="/login"
    element={<LoginPage />}
   />

  </Routes>
</BrowserRouter>


    )
};

export default AppRouter;