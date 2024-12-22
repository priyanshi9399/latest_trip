import React from "react";
import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../../../../services/Service";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./../../../../utils/config";
const BadgeList = () => {
  const navigate = useNavigate();

  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [badgeDataList, setBadgeDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState(false);
  const [editInput, setEditInput] = useState();
  const [ID, setId] = useState();

  //get badge list
  const getBadgeList = async () => {
    setIsLoading(true);
    const useListData = await PostAPI("badge/badge_list", {
      items_perpage: items_perpage,
      current_page: current_page,
      search: search,
    });
    debugger;
    if (useListData.response_code == "200") {
      setBadgeDataList(useListData.data.result);
      setTotalPage(useListData.data.total);
      setIsLoading(false);
    } else {
      toast.error(useListData.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBadgeList();
  }, []);

  useEffect(() => {
    getBadgeList();
  }, [current_page]);

  const pagechangeHandler = (offset) => {
    setCurrent_page(offset);
  };

  //Search handle
  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  useEffect(() => {
    getBadgeList();
  }, [search]);

  //delete badge
  const handleDelete = (e, a) => {
    e.preventDefault();

    const confirmVar = window.confirm("Are you sure you want to delete?");
    if (confirmVar) {
      deleteData(a);
    }
  };
  const deleteData = async (a) => {
    const ListDataDelete = await PostAPI("badge/delete_badge", {
      badge_id: a,
    });
    if (ListDataDelete.response_code == 200) {
      toast(ListDataDelete.message);
      getBadgeList();
    } else {
      toast.error(ListDataDelete.message);
    }
  };

  //Edit Badge name

  const updateInput = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("badge_name", e.target.badge_name.value);

    const updateInputData = await PostAPI("badge/update_badge_name", {
      badge_id: ID,
      formData,
    });

    if (updateInputData.response_code == 200) {
      toast(updateInputData.message);
    } else {
      toast.error(updateInputData.message);
    }
    getBadgeList();
    setCondition(false);
  };
  useEffect(() => {
    getBadgeList();
  }, [condition]);

  const hadleOnClickInput = (e, id, name) => {
    e.preventDefault();
    setEditInput(name);
    setId(id);
    setCondition(true);
  };

  const handleInputUpdate = (e) => {
    e.preventDefault();
    setEditInput(e.target.value);
  };
  let content;
  content = (
    <>
      <form action="" onSubmit={(e) => updateInput(e)}>
        <input
          type="text"
          name="badge_name"
          value={editInput}
          onChange={(e) => handleInputUpdate(e)}
        />
        <button class="btn btn-info ">Save</button>
      </form>
    </>
  );

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="page-header ">
          <h3 class="page-title ">Badge List</h3>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="form-group d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  style={{ width: "800px", height: "50px" }}
                  onChange={(value) => searchHandler(value)}
                />

                <button
                  class="btn btn-gradient-primary me-2"
                
                  onClick={() => navigate(-1)}
                  style={{ marginLeft: "40px" }}
                  type="button"
                >
                  Add Badge
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Badge Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {badgeDataList.length === 0 && (
                  <tr>
                    <td colspan="7">No Record Found</td>
                  </tr>
                )}
                {badgeDataList.map((value, key) => {
                  return (
                    <tr>
                      <td>{value.badge_id}</td>

                      <td
                        onClick={(e) =>
                          hadleOnClickInput(e, value.badge_id, value.badge_name)
                        }
                      >
                        {condition && ID == value.badge_id
                          ? content
                          : value.badge_name}
                      </td>
                      <td>{value.badge_description}</td>
                      <td>
                        {value.badge_img && (
                          <img
                            style={{ height: "50px", width: "50px" }}
                            src={`${API_BASE_URL}/images/${value.badge_img}`}
                            alt={value.badge_name}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={(e) => handleDelete(e, value.badge_id)}
                          type="button" class="btn btn-outline-secondary btn-sm"
                        >
                          Delete
                        </button>
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
  );
};

export default BadgeList;
