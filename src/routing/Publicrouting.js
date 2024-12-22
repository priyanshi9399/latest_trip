import { Routes, Route } from "react-router-dom";
import Login from "../component/auth/Login";
import Home from '../component/pages/frontend/Home';
import HomeIndex from '../component/pages/frontend/index';

//import About from '../component/pages/frontend/pages/About';
//import Contact from '../component/pages/frontend/pages/Contact';
//import Service from '../component/pages/frontend/pages/Service';


const PublicRoute = (props) => {
 
  return (
   
        <Routes>
          <Route  path="/" element={<HomeIndex/>} >
            <Route  path="/home" element={<Home/>} />
            <Route path="/" element={<Login/>} />
          </Route>  

        </Routes>

  );
};

export default PublicRoute;