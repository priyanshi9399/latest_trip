import React from "react";
import {Link} from "react-router-dom";

const NavigationBar = (props) => {
  return (
    <>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto homepage">
      <li class="nav-item active">

        <Link to="" class="nav-link" >Home </Link>
      </li>
      <li class="nav-item">
        <Link to="about" class="nav-link" >About </Link>
      </li>

      <li class="nav-item">
        <Link to="service" class="nav-link" >Service </Link>
        
      </li>

      <li class="nav-item">
      <Link to="contact-us" class="nav-link" >Contact </Link>
      </li>
  
    </ul>
    <ul class="navbar-nav homepage">
    <li class="nav-item"> <Link to="login" class="nav-link">Login</Link></li>
    </ul>
      
    
  </div>
  </div>
</nav>
     
    </>
  );
};

export default NavigationBar;
