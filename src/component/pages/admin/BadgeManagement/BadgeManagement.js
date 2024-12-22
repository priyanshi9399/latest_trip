import React from "react";
import { useState } from "react";
import BadgeList from "../BadgeManagement/BadgeList";
import { useNavigate } from "react-router-dom";
import { PostAPI, PostAPIWithImageUpload } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";

const defaultData = {
  badge_name: "",
  badge_description: "",
  badge_img: "",
  badge_status: "active",
};

const BadgeManagement = () => {
  const [BadgeName, setBadgeName] = useState("");
  const [BadgeDescription, setBadgeDescription] = useState("");
  const [Badgeerror, setBadgeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [badgeData, setBadgeData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [badgeImage, setBadgeImage] = useState("");

  const navigate = useNavigate();

  //Add badge
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.badge_img.files[0];
    const formData = new FormData();
    formData.append("badge_img", file);
    formData.append("badge_name", e.target.badge_name.value);
    formData.append("badge_description", e.target.badge_description.value);

    const AddBadge = await PostAPIWithImageUpload(
      "badge/add_badge",
      formData,
      "multipart/form-data"
    );
    if (AddBadge.response_code == "200") {
      toast(AddBadge.message);
      setIsLoading(false);
      setBadgeName("");
      setBadgeDescription("");
      setBadgeImage("");
    }

    if (AddBadge.response_code == "500") {
      toast.error(AddBadge.message);
      setIsLoading(false);
    }
    //setBadgeError(true);
    //setDescriptionError(true);
  };

  function BadgeNameHandler(e) {
    let Badge = e.target.value;
    if (Badge.length < 3) {
      setBadgeError(true);
    } else {
      setBadgeError(false);
      setBadgeData({
        ...badgeData,
        badge_name: Badge,
      });
    }
    setBadgeName(Badge);
  }

  function descriptionHandler(e) {
    let BadgeDescription = e.target.value;
    if (BadgeDescription.length < 3) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
      setBadgeError(false);
      setBadgeData({
        ...badgeData,
        badge_description: BadgeDescription,
      });
    }
    setBadgeDescription(BadgeDescription);
  }

  function imageHandler(e) {
    let BadgeImage = e.target.value;
    setBadgeData({
      ...badgeData,
      badge_img: BadgeImage,
    });
    setBadgeImage(BadgeImage);
  }

  return (
    <>
      <div className="content-wrapper">
        <div class="row">
          <div class=" d-flex ">
            <div class="page-header ">
              <h3 class="page-title ">Badge Management</h3>
            </div>

            <div class="col-md-11 d-flex justify-content-end mb-3">
              <button
                class="btn btn-gradient-primary me-2"
                onClick={() => {
                  navigate("/badge_list");
                }}
              >
                View Badges
              </button>
            </div>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <form
                  action=""
                  onSubmit={(e) => handleSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div class="btn-group btn-group-justified">
                    <div>
                      <label htmlFor="BadgeName" className="form-label">
                        Badge Name
                      </label>
                      <input
                        type="text"
                        placeholder="Badge name"
                        onChange={BadgeNameHandler}
                        value={BadgeName}
                        class="form-control"
                        style={{ width: "800px" }}
                        name="badge_name"
                      />
                    </div>
                  </div>

                  <h6 style={{ color: "red" }}>
                    {Badgeerror ? <h6>BadgeName not Valid</h6> : ""}
                  </h6>

                  <div className="mb-3  mt-4">
                    <label htmlFor="BadgeDescription" className="form-label">
                      Badge Description
                    </label>
                    <textarea
                      className="form-control"
                      id="BadgeDescription"
                      rows="3"
                      style={{ width: "800px" }}
                      placeholder="Enter Badge description"
                      onChange={descriptionHandler}
                      value={BadgeDescription}
                      name="badge_description"
                    ></textarea>
                  </div>
                  <h6 style={{ color: "red" }}>
                    {descriptionError ? (
                      <h6>BadgeDescription not Valid</h6>
                    ) : (
                      ""
                    )}
                  </h6>

                  <div className="mb-3">
                    <label htmlFor="BadgeImage" className="form-label">
                      Badge Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="BadgeImage"
                      style={{ width: 800 }}
                      placeholder="Enter Badge image"
                      onChange={(e) => imageHandler(e)}
                      value={badgeImage}
                      name="badge_img"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient-primary me-2"
                    style={{ width: 100 }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgeManagement;
