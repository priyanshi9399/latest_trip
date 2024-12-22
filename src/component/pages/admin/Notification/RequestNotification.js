import react, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaWallet, FaUserAlt } from "react-icons/fa";
import { PostAPI } from "../../../../services/Service";
import { Toast } from "react-bootstrap";

const RequestNotification = () => {
  const [requestList, setRequestList] = useState([]);
  const [condition ,setCondition] = useState(false);

  const navigate = useNavigate();
  const requests = async () => {
    const RequestData = await PostAPI("notification/get_notification_users");

    if (RequestData.response_code == "200") {
      setRequestList(RequestData.data);
    }
  };

  useEffect(() => {
    requests();
  }, []);

  useEffect(() => {
    requests();
    setCondition(false);
  }, condition);

  const handleRequestClick = async (rec_id) => {
    const notificationUnset = await PostAPI("notification/unset_notification", {
      id: rec_id,
    });
    setCondition(true);
    navigate("/requested-user");
  };

  return (
    <>
      {requestList == 0 ? <p class="text-gray ellipsis mb-0">No requests</p> :
     
      <>
       <div className="d-flex row">
      {requestList.map((value) => (
        <div className="d-flex preview-item">
           <div class="dropdown-divider"></div>
          <div class="preview-thumbnail">
            <div class="preview-icon bg-warning">
              <i class=" mdi mdi-link-variant"></i>
            </div>
          </div>
          <div onClick={()=>handleRequestClick(value.id)} class="preview-item-content d-flex align-items-start flex-column justify-content-center">
            <h6 class="preview-subject font-weight-normal mb-1">
              {value.first_name}{" "} {value.last_name}{' '}send you request!
            </h6>
            <p class="text-gray ellipsis mb-0">Request</p>
          </div>
          <div class="dropdown-divider"></div>
        </div>
       
      ))}
       </div>
      </>
     
     }
    </>
  );
};
export default RequestNotification;
