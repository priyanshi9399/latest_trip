import { useState, useContext, createContext, useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";

import { json } from "react-router-dom";

const userDefaultData = {
  category_id: "",
  category_name: "",
  group_activity_name: "",
};

function AddActivityGroup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [activityData, setactivityData] = useState(userDefaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [categoryList, setcategoryList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setactivityData({
      ...activityData,
      [name]: value,
    });
  };

  const handleClick = (e, id, name) => {
    console.log(name);
    console.log(id);
    e.preventDefault();
    setactivityData({
      ...activityData,
      category_id: id,
      category_name: name,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    const AddGroupActivity = await PostAPI(
      "group_activity/add_group_activity",
      activityData
    );
    if (AddGroupActivity.response_code == "200") {
      //alert("Successfully register");
      toast(AddGroupActivity.message);
      setIsLoading(false);
    }

    if (AddGroupActivity.response_code == "500") {
      toast.error(AddGroupActivity.message);
      setIsLoading(false);
    }
  };

  //handle search
  const getCategoryList = async () => {
    const useListData = await PostAPI("category/category_list", {
      search: search,
    });

    if (useListData.response_code == 200) {
      setcategoryList(useListData.data.result);
    }
  };

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   setHindeList(true);
  //   setSearch(e.target.value);
  // };

  useEffect(() => {
    getCategoryList();
  }, [search]);

  // function handleSelectChange(event) {
  //   const selectedValue = event.target.value;
  //   console.log("Selected value:", selectedValue);

  // }
  function handleSelectChange(event) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categoryList.find(
      (category) => category.category_id === selectedCategoryId
    );
    if (selectedCategory) {
      setactivityData({
        ...activityData,
        category_id: selectedCategory.category_id,
        category_name: selectedCategory.category_name,
      });
    }
  }

  // useEffect(() => {
  //   // Load Select2 script

  //   // Load external CSS
  //   const cssLink = document.createElement("link");
  //   cssLink.rel = "stylesheet";
  //   cssLink.href = "inspire_theme/css/style.css";
  //   document.head.appendChild(cssLink);

  //   const cssLink2 = document.createElement("link");
  //   cssLink2.rel = "stylesheet";
  //   cssLink2.href = 'inspire_theme/vendors/select2/select2.min.css">';
  //   document.head.appendChild(cssLink2);

  //   const select2Script = document.createElement("script");
  //   select2Script.src = "inspire_theme/vendors/select2/select2.min.js";
  //   select2Script.async = true;
  //   document.body.appendChild(select2Script);

  //   const select3Script = document.createElement("script");
  //   select3Script.src = "inspire_theme/js/select2.js";
  //   select3Script.async = true;
  //   document.body.appendChild(select3Script);

  //   // Load vendor script
  //   const vendorScript = document.createElement("script");
  //   vendorScript.src = "inspire_theme/vendors/js/vendor.bundle.base.js";
  //   vendorScript.async = true;
  //   document.body.appendChild(vendorScript);

  //   // Cleanup
  //   return () => {
  //     // Remove Select2 script
  //     if (select2Script.parentNode) {
  //       select2Script.parentNode.removeChild(select2Script);
  //     }

  //     // Remove vendor script
  //     if (vendorScript.parentNode) {
  //       vendorScript.parentNode.removeChild(vendorScript);
  //     }

  //     // Remove CSS link
  //     if (cssLink.parentNode) {
  //       cssLink.parentNode.removeChild(cssLink);
  //     }
  //   };
  // }, []);
  return (
    <>
      <form onSubmit={submitHandler}>
        {/* {JSON.stringify(categoryList)} */}

        <div className="d-flex ">
          <div className="m-1 ">
            <input
              type="text"
              placeholder="Activity name"
              class="form-control "
              name="group_activity_name"
              value={activityData.group_activity_name}
              style={{ height: "48px" }}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="form-group m-1">
            <select
              className="form-control"
              onChange={handleSelectChange}
              style={{ width: "100%", height: "48px" }}
              // value={activityData.category_name}
              value={activityData.category_id}
            >
              {categoryList.map((value, key) => (
                <option key={key} value={value.category_id}>
                  {value.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button class="btn btn-gradient-primary mx-3" type="submit">
              Submit
              {isLoading && <Loader />}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddActivityGroup;
