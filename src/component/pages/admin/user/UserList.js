import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";

import { PostAPI } from "../../../../services/Service";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function UserList() {
  let navigate = useNavigate();

  const [items_perpage, seIitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    setIsLoading(true);
    const useListData = await PostAPI("user_management/getMyUser", {
      items_perpage: items_perpage,
      current_page: current_page,
    });

    if (useListData.response_code == 200) {
      setUserList(useListData.data.result);
      setTotalPage(useListData.data.total);
      setIsLoading(false);
    } else {
      toast.error(useListData.message);
      setIsLoading(false);
    
    }
   
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getUserList();
  }, [current_page]);

  const pagechangeHandler = (offset) => {
    //debugger;
    //alert(offset)
    setCurrent_page(offset);
  };

  //delete
  const handleDelete = (e, a) => {
    e.preventDefault();

    const confirmVar = window.confirm("Are you sure you want to delete?");
    if (confirmVar) {
      deleteData(a);
    }
  };
  const deleteData = async (a) => {
    const ListDataDelete = await PostAPI("user_management/delete_user", {
      id: a,
    });
    if (ListDataDelete.response_code == 200) {
      toast(ListDataDelete.message);
      getUserList();
    } else {
      toast.error(ListDataDelete.message);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <div class="content-wrapper">
        <div class="row">
          <div class="row">
            <div class=" d-flex justify-content-between">
              <div class="page-header ">
                <h3 class="page-title "> User List </h3>
              </div>
             
                <div class="col-md-11 d-flex justify-content-end mb-3">
                  <button
                    class="btn btn-gradient-primary me-2"
                    onClick={() => {
                      navigate("/add-user");
                    }}
                  >
                    Add User
                  </button>
              
              </div>
            </div>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.length === 0 && (
                      <tr>
                        <td colspan="7">No Record Found</td>
                      </tr>
                    )}
                    {userList.map((value, key) => {
                      return (
                        <tr>
                          <td>{value.id}</td>
                          <td>{value.username}</td>
                          <td>
                            {" "}
                            {value.first_name} {value.last_name}
                          </td>
                          <td>{value.email}</td>
                          <td>{value.phone}</td>
                          <td>{value.city}</td>
                          <td>{value.active == 1 ? "Active" : "Deactive"}</td>
                          <td>
                            <div class="btn-group" role="group">
                              <button
                                type="button"
                                onClick={(e) => handleDelete(e, value.id)}
                                class="btn btn-outline-secondary btn-sm"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  navigate(`/user-update/${value.id}`);
                                }}
                                class="btn btn-outline-secondary btn-sm"
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {isLoading && <Loader />}
                {totalPages > 0 && (
                  <Pagination
                    itemsPerPage={items_perpage}
                    totalPage={totalPages}
                    pagechangeHandler={pagechangeHandler}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
