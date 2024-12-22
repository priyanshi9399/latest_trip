import isEmpty from "is-empty";
import {useState,useContext,createContext} from "react";



function ContactUs() {

  

  return (
    <>
    
    <div class="pagecontainerheader">
        <h3>Contact US</h3>
    </div> 
    

    <div class="">
    <div class="container">

      <main role="main" class="col-md-12 pt-3 px-4">
        <h3>Get In Touch With Us</h3>
        <p>
        Please fill out the contact form provided. One of our representatives
will contact you within the next 24 hours.
        </p>

        <div class="row">
              <div class="col-lg-10 addr_content">
                <ul class="contactus_address">
                  <li class="mb-2"><span class="fas fa-map-marker" aria-hidden="true"></span> 106, Radhika Premier, Main
                    Rd,
                    Mahalaxmi Nagar, Indore, Madhya Pradesh 452010
                  </li>
                  <li class="mb-1"><span class="fas fa-phone-alt" aria-hidden="true"></span> <a href="tel:+919009497975"> +91-9669667557 </a>
                  </li>
                  <li class="mb-1"><span class="fas fa-phone-alt" aria-hidden="true"></span> <a href="tel:+916266766137">+91-7880037557 </a>
                  </li>
                  <li class="mb-2"><span class="fas fa-envelope" aria-hidden="true"></span> <a href="mailto:info@rightpe.com">info@rightpe.com</a></li>
                  <li class="mb-1"><span class="fas fa-clock" aria-hidden="true"></span> Office Time : <br/>
                    Mon - Sat (10am to 7pm)
                  </li>
                </ul>
              </div>
        </div>


      </main>
    </div>
    </div>
    </>
  );
}

export default ContactUs;
