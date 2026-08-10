import PublicLayout from "../layout/PublicLayout.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

function AppRouter(){

    return(

<BrowserRouter>
  <Routes>
<Route path ="/"
       element = {<PublicLayout />}>


     <Route
    index
    element={<LandingPage />}
    />
   <Route
    path="/login"
    element={<LoginPage />}
   />
</Route>

    

  </Routes>
</BrowserRouter>


    )
};

export default AppRouter;