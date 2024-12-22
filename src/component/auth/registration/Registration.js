import React, { useState } from 'react'
import { UserRegister } from "../../../services/Service";
import {toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Registration = () => {

    const [formData , setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

    const [errors , setErrors] = useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirmpassword: '',
    });
    const [vid ,setVid] = useState(false);
    const [loder,setLoder] = useState(false);

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setVid(true)
    };

   const handleSubmit = async(e) => {
    e.preventDefault();
    validateForm();
  
     // If validation is successful, you can proceed with form submission
    if(isFormValid()) {
        setLoder(true);

        const res = await UserRegister(formData);
       
		if (res.response_code === 200) {
		  //onSubmitUserHandler(res?.response);
          toast(res.message)
          setLoder(false);

    
		//   setIsLoging(false);
		  alert("register Success");
		}else if(res.response_code === 500) {
           
            toast.error(res.message)
		//   setIsLoging(false);
        setLoder(false);


		  
		}
        
         // Perform registration or API call here
         console.log('Form submitted successfully!');
    }
   };

   const validateForm = () => {
        let validationErrors = {
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            password: '',
            confirmpassword: '',
        };
        if(!formData.first_name.trim()){
            validationErrors.name = 'Name is Required';
        }
        if(!formData.last_name.trim()){
            validationErrors.lastname = 'Last Name is Required';
        }
        if(formData.mobile.length < 10){
            validationErrors.mobilenumber = 'Mobile Number must be at least 10 characters';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
          validationErrors.email = 'Valid email is required';
        }
        if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
          }
      
          // Confirm Password validation
          if (formData.password !== formData.confirmpassword) {
            validationErrors.confirmpassword = 'Passwords do not match';
          }
          setErrors(validationErrors);

   };
   const isFormValid = () => {
    return (
      !errors.first_name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmpassword &&
      !errors.last_name &&
      !errors.mobile
     
    );
  };
  return (
   <div>
        <div className='container-fluid'>
            <div className='row'>
                <div class="col-md-4 col-lg-4 px-4 mx-auto">
                    <br/>
                    {/* <img src={WLOGO} /> 
                    <br/> */}
                    <br/>
                    <h3>Registration Form</h3>
                    <br/>

         <form onSubmit={handleSubmit}> 
               
               <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
               <span className="text-danger" >{errors.first_name}</span>
              </div>

               <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
               <span className="text-danger">{errors.last_name}</span>
              </div>
              <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="number"
                class="form-control form-control-xl"
                placeholder="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.mobile}</span>
             
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.email}</span>
             
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.password}</span>
             
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.confirmpassword}</span>
             
            </div>
           <button
              class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
              type="submit"
              disabled= {vid?"":"disabled"}
            >
           {loder?<i class="fas fa-2x fa-sync-alt fa-spin"></i>:''}  Registration
           </button>
        
        <div class="text-center mt-4 font-weight-light"> Already have an account? 
        
        
        
        <Link to="/login"> <a type="button" >Login</a></Link>
                  </div>

        </form>
                </div>

            </div>

        </div>

   </div>
  )
}

export default Registration