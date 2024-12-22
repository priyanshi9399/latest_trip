import React from "react";
import { Outlet,Link } from "react-router-dom";
import ItemSlider from "./ItemSlider";
import NavigationBar from "./NavigationBar";



/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <>
      
      <div className="content-wrap">
        

        <Outlet/>
  

      </div>

      <div class="my-5">
    
      </div>
    </>
  );
};
export default Home;
