import React from "react";
import { Carousel } from "react-bootstrap";

import Slide2 from "../../../assets/img/slide2.jpg";
import Slide3 from "../../../assets/img/slide3.jpg";
import Slide4 from "../../../assets/img/slide4.jpg";

/**
 * @author
 * @function Banner
 **/

const Banner = (props) => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src="img/slider1.jpg" alt="First slide" />
          <Carousel.Caption>
          {/*<h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="img/slider2.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="img/slider.png" alt="Third slide" />
        </Carousel.Item>
       
      </Carousel>
    </>
  );
};

export default Banner;
