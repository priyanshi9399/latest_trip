import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";

const userDefaultData = {
  new_password: "",
  confirm_password: "",
};

export default function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState(userDefaultData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); //
    setIsLoading(true);
    const PasswordChanged = await PostAPI(
      "setting/change_password",
      newPassword
    );
    if (PasswordChanged.response_code == "200") {
      toast(PasswordChanged.message);
      setIsLoading(false);
    }

    if (PasswordChanged.response_code == "500") {
      toast.error(PasswordChanged.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div class="content-wrapper">
        <main role="main" class="col-md-12 pt-3 px-4">
          {/*JSON.stringify(operator)*/}
          <h3>Change Password</h3>

          <br />
          <form onSubmit={submitHandler}>
            <div class="row col-sm-12 col-xs-12 col-lg-12">
              <div class="form-group col-sm-6 col-lg-6">
                <label for="amount">New Password</label>
                <br />
                <label>
                  <input
                    class="form-control"
                    type="text"
                    name="new_password"
                    value={newPassword.new_password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div class="form-group col-sm-6 col-lg-6">
                <label for="amount"> Confirm Password</label>
                <br/>
                <label>
                  <input
                    class="form-control"
                    type="text"
                    name="confirm_password"
                    value={newPassword.confirm_password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {isLoading && <Loader />}

              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button
                class="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
