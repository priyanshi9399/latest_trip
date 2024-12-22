import React, { useState, useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";

const AllNotification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);

  const allNotification = async () => {
    const NotificationData = await PostAPI("notification/all_notifications",{
      items_perpage: items_perpage,
      current_page: current_page,
    });
    if (NotificationData.response_code == 200) {
      setNotificationList(NotificationData.data.result);
    } else if (NotificationData.response_code == 500) {
      toast.error(NotificationData.message);
      setNotificationList([]);
    }
  };

  useEffect(() => {
    allNotification();
  }, []);
  const pagechangeHandler = (offset) => {
    setCurrent_page(offset);
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div class="page-header">
          <h3 class="page-title">Notifications</h3>
        </div>

        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
            <div class="tab-content pt-5" id="tab-content">
                  <div
                    class="tab-pane active"
                    id="fill-tabpanel-0"
                    role="tabpanel"
                    aria-labelledby="fill-tab-0"
                  >                  {notificationList == 0 ? (
                    <p>No notifications</p>
                  ) : (
                    <>
                      {notificationList.map((user) => (
                        <table class="table table-striped">
                          <thead>
                          <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Notification type</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>{user.sender_id}</td>
                            <td>{user.first_name}{' '}{user.last_name}</td>
                            <td>{user.notification_type}</td>
                          </tr>
                          </tbody>
                        </table>
                        
                      ))}
                       {totalPages > 0 && (
                          <Pagination
                            itemsPerPage={items_perpage}
                            totalPage={totalPages}
                            pagechangeHandler={pagechangeHandler}
                          />
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllNotification;
