import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";
import SideNavigation from "./SideNavigation";
import AdminTopNavigation from "./AdminTopNavigation";
import { useSelector, useDispatch } from "react-redux";
import GameListScreen from "../frontend/GameListScreen";
import { PostAPI } from "../../../services/Service";
import { CImage } from "@coreui/react";

function Dashboard(props) {
  const detail = {
    todayRecharge: 2000,
    todayBillpayment: 5000,
    todayPencard: 6,
  };
  const [uDetails, setUdetails] = useState(detail);
  const [activeUsers, setActiveUsers] = useState("");
  const [totalGoals, setTotalGoals] = useState("");
  const [upcommingGoals, setUpcommingGoals] = useState("");
  const [monthlyUsers, setMonthlyUsers] = useState("");

  const fetchActiveUsers = async () => {
    const activeUsersData = await PostAPI("user_management/active_users");

    if (activeUsersData.response_code == "200") {
      if (activeUsersData.data !== "0") {
        setActiveUsers(activeUsersData.data);
      } else {
        setActiveUsers("0");
      }
    } else if (activeUsersData.response_code == "500") {
      setActiveUsers('0');
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const fetchTotalGoals = async () => {
    const goalsData = await PostAPI("myuser_activity/total_goals");

    if (goalsData.response_code == "200") {
      if (goalsData.data !== "0") {
        setTotalGoals(goalsData.data);
      } else {
        setTotalGoals("0");
      }
    } else if (goalsData.response_code == "500") {
      setTotalGoals("0");
    }
  };

  useEffect(() => {
    fetchTotalGoals();
  }, []);

  const fetchUpcomminGoals = async () => {
    const UpcommingGoalsData = await PostAPI("myuser_activity/upcomming_goals");

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

  const fetchMonthlyUsers = async () => {
    const monthlyUsersData = await PostAPI(
      "user_management/monthly_active_users"
    );

    if (monthlyUsersData.response_code == "200") {
      if (monthlyUsersData.data !== "0") {
        setMonthlyUsers(monthlyUsersData.data);
      } else {
        setMonthlyUsers("0");
      }
    } else if (monthlyUsersData.response_code == "500") {
      setMonthlyUsers("0");
    }
  };

  useEffect(() => {
    fetchMonthlyUsers();
  }, []);

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="page-header">
          <h3 class="page-title"> Dashboard </h3>
        </div>

        <div class="col-md-3 stretch-card grid-margin">
          <div class="card bg-gradient-danger card-img-holder text-white">
            <div class="card-body">
              <img
                src="/inspire_theme/images/dashboard/circle.svg"
                class="card-img-absolute"
                alt="circle-image"
              />
              <h4 class="font-weight-normal mb-3">
                Active Users <i class="fa fa-user-circle-o fa-lg float-end"></i>
              </h4>
              <h2>{activeUsers}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-3 stretch-card grid-margin">
          <div class="card bg-gradient-info card-img-holder text-white">
            <div class="card-body">
              <img
                src="/inspire_theme/images/dashboard/circle.svg"
                class="card-img-absolute"
                alt="circle-image"
              />
              <h4 class="font-weight-normal mb-3">
                Total Goals <i class="fa fa-bullseye fa-lg float-end"></i>
              </h4>
              <h2>{totalGoals}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-3 stretch-card grid-margin">
          <div class="card bg-gradient-primary card-img-holder text-white">
            <div class="card-body">
              <img
                src="/inspire_theme/images/dashboard/circle.svg"
                class="card-img-absolute"
                alt="circle-image"
              />
              <h4 class="font-weight-normal mb-3">
                {" "}
                Upcomming Goals <i class="fa fa-bullseye fa-lg float-end"></i>
              </h4>
              <h2>{upcommingGoals}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-3 stretch-card grid-margin">
          <div class="card bg-gradient-success card-img-holder text-white">
            <div class="card-body">
              <img
                src="/inspire_theme/images/dashboard/circle.svg"
                class="card-img-absolute"
                alt="circle-image"
              />
              <h4 class="font-weight-normal mb-3">
                Mothy Users <i class="fa fa-calendar fa-lg float-end"></i>
              </h4>
              <h2>{monthlyUsers}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
