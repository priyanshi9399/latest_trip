import React from "react";
import { useState, useEffect } from "react";
import { PostAPI } from "../../../services/Service";

const UserDashBoard = () => {
  const [upcommingGoals, setUpcommingGoals] = useState("");
  const [totalGoals, setTotalGoals] = useState("");
  const [totalFriends, setTotalFriends] = useState("");
  const fetchUpcomminGoals = async () => {
    const UpcommingGoalsData = await PostAPI(
      "myuser_activity/user_upcomming_goals"
    );
    if (UpcommingGoalsData.response_code == "200") {
      if (UpcommingGoalsData.data !== "0") {
        setUpcommingGoals(UpcommingGoalsData.data);
      } else {
        setUpcommingGoals("0");
      }
    } else if (UpcommingGoalsData.response_code == "500") {
      setUpcommingGoals("0");
    }
  };

  useEffect(() => {
    fetchUpcomminGoals();
  }, []);
  const fetchTotalGoals = async () => {
    const goalsData = await PostAPI("myuser_activity/user_total_goals");
    if (goalsData.response_code == "200") {
      if (goalsData.data != "0") {
        setTotalGoals(goalsData.data);
      } else {
        setTotalGoals("0");
      }
    } else {
      setTotalGoals("0");
    }
  };

  useEffect(() => {
    fetchTotalGoals();
  }, []);

  const fetchTotalFriends = async () => {
    const friendsData = await PostAPI("chating/count_chat_users");
    if (friendsData.response_code == "200") {
      if (friendsData.data != "0") {
        setTotalFriends(friendsData.data);
      } else {
        setTotalFriends("0");
      }
    } else if (friendsData.response_code == "500") {
      setTotalFriends("0");
    }
  };

  useEffect(() => {
    fetchTotalFriends();
  }, []);

  return (
    <div>
      <div class="content-wrapper">
        <div class="row">
          <div class="page-header">
            <h3 class="page-title"> Dashboard </h3>
          </div>
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-danger card-img-holder text-white">
              <div class="card-body">
                <img
                  src="/inspire_theme/images/dashboard/circle.svg"
                  class="card-img-absolute"
                  alt="circle-image"
                />
                <h4 class="font-weight-normal mb-3">
                  Upcoming Goals <i class="fa fa-bullseye fa-lg float-end"></i>
                </h4>
                <h2>{upcommingGoals}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
              <div class="card-body">
                <img
                  src="/inspire_theme/images/dashboard/circle.svg"
                  class="card-img-absolute"
                  alt="circle-image"
                />
                <h4 class="font-weight-normal mb-3">
                  {" "}
                  Completed Goals <i class="fa fa-bullseye fa-lg float-end"></i>
                </h4>
                <h2>{totalGoals}</h2>
              </div>
            </div>
          </div>

          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-primary card-img-holder text-white">
              <div class="card-body">
                <img
                  src="/inspire_theme/images/dashboard/circle.svg"
                  class="card-img-absolute"
                  alt="circle-image"
                />
                <h4 class="font-weight-normal mb-3">
                  No. of Friends <i class="fa fa-group float-end"></i>
                </h4>
                <h2>{totalFriends}</h2>
              </div>
            </div>
          </div>

          <div class="col-md-8 stretch-card grid-margin">
            <div class="card card-img-holder">
              <div class="card-body">
                <img
                  src="/inspire_theme/images/dashboard/circle.svg"
                  class="card-img-absolute"
                  alt="circle-image"
                />
                <h4 class="font-weight-normal mb-3">
                  My Badges <i class="fa fa-certificate fa-lg float-end"></i>
                </h4>
                <div class="BadgesArea">
                  <img src="/inspire_theme/images/logo-mini.png" alt="Badge" />
                  <img src="/inspire_theme/images/logo-mini.png" alt="Badge" />
                  <img src="/inspire_theme/images/logo-mini.png" alt="Badge" />
                  <img src="/inspire_theme/images/logo-mini.png" alt="Badge" />
                  <img src="/inspire_theme/images/logo-mini.png" alt="Badge" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 stretch-card grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">Bar chart</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
