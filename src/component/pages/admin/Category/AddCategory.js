import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";

import { PostAPI, PostAPIWithImageUpload } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

const userDefaultData = {
  category_name: "",
  category_description: "....",
  image: "",
  status: "active",
};

export default function AddCategory() {
  let navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formfilled, setformfilled] = useState(true);
  const [categoryData, setCategoryData] = useState(userDefaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [ActivityImage, setActivityImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const ActivityImage = e.target.value;
    setCategoryData({
      ...categoryData,
      image: ActivityImage,
    });
    setActivityImage(ActivityImage);
  };

  const submitHandler = async (e) => {
    e.preventDefault(); //
    setIsLoading(true);

    const file = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category_name", e.target.category_name.value);

    const AddImage = await PostAPIWithImageUpload(
      "category/add_category",
      formData,
      "multipart/form-data"
    );
    if (AddImage.response_code == "200") {
      toast(AddImage.message);
      setIsLoading(false);
      setCategoryName("");
      setActivityImage("");
    }

    if (AddImage.response_code == "500") {
      toast.error(AddImage.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} encType="multipart/form-data" action="">
        <div className="form-sample">
          <div className="row align-items-center">
          <div className="col-md-4">
              <input
                type="text"
                placeholder="Activity name"
                className="form-control"
                name="category_name"
                value={categoryData.category_name}
                style={{ height: "48px" }}
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-6">
              <div className="input-group">
                
                <input
                  type="file"
                  className="form-control "
                  onChange={handleImageUpload}
                  style={{lineHeight: "35px"}}
                  placeholder="Upload Image"
                  name="image"
                />

                <div className="input-group-append">
                  <button className="btn btn-gradient-primary" type="button"
                  onClick={() => document.getElementById('inputGroupFile01').click()}
                  style={{ height: "45px" }}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-gradient-primary"
                type="submit"
                style={{ width: "80px", height: "48px" }}
              >
                {isLoading && <Loader />}Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
