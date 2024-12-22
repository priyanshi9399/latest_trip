import isEmpty from "is-empty";
import {useState} from "react";
import {PostAPI} from "../../../../services/Service";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../assest/Toast/ToastMessage";

export default function Changepswd() {

    const [errorMessage,setErrorMessage] = useState();
    const [userpassword,setpassword] = useState({new_password: "", confirm_password: ""});
    const [isValid,setValid] = useState(true);

    const [toastMessage, setToastMessage] = useState("");
    
    const [showToast, setShowToast] = useState(false);
    const handleCloseToast = () => setShowToast(false);
    const handleShowToast = () => setShowToast(false);

    const navigate = useNavigate();
    

    const onChangeHandler = (e) => {
		setpassword((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
       
        if(userpassword.new_password.length > 4) {
            setValid(false);
        }
    };

    const submitHandler = async (e)  => {
        debugger;
		e.preventDefault();
	

        const {new_password ,confirm_password} = userpassword;
        debugger
        const payload = {
            new_password,
            confirm_password

        }

        if(new_password != confirm_password ) {
            setErrorMessage("confirm password not match")
            return false;
        }

        if(new_password.length < 6 ) {
            setErrorMessage("password should be more than six digits")
            return false;
        }
       

        
        const res = await PostAPI("setting/change_password",payload);

        if (res.response_code === 200) {
           
            localStorage.clear();
            setShowToast(true);
            setToastMessage("Your password change successfully");

            setTimeout(()=>{
                navigate("/login");
            },3000)

           
         
          }else if(res.response_code === 500) {
           
            if (!isEmpty(res.message)) {
                setErrorMessage(res.message);
            }
          }
    }

    return (

         <> 
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {/*JSON.stringify(operator)*/}
                <h3>Change password</h3>
                    <form  onSubmit = {submitHandler}>
                        
    
                        <div class="form-group">
                            <label for="amount">Password</label>
                            <input type="text" 
                            class="form-control" 
                            id="new_password"
                            name="new_password" 
                            
                            placeholder="password" onChange={onChangeHandler}/>
                        </div>
    
                        <div class="form-group">
                            <label for="amount">Confirm Password</label>
                            <input type="text" 
                            class="form-control" 
                            id="confirm_password"
                            name="confirm_password"
                            
                            placeholder="Confirm Password"  onChange={onChangeHandler}/>
                        </div>
    
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <button
                        class="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                        type="submit"
                        disabled = {isValid}
                        >
                        Submit
                        </button>
                </form>
            </main>

            <ToastMessage
        show={showToast}
        close={handleCloseToast}
        message={toastMessage}
        type="Success"
        title=""
      />
      </>
      
      );
}