import { useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import "./SearchBar.css";
import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hideList, setHindeList] = useState(true);
  const [inputFields, setInputFields] = useState([]);

  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);

  const getCategoryList = async () => {
    const useListData = await PostAPI("category/category_list");
    const resultData = useListData.data.result;
    setSearchResults(resultData);
  };

  useEffect(() => {
    getCategoryList();
  }, [searchTerm]);

  const handleChange = (event) => {
    setHindeList(true);
    setSearchTerm(event.target.value);
    const filteredResults = searchResults.filter((item) => {
      if (typeof item === "string") {
        return item.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setSearchResults(filteredResults);
    return filteredResults;
  };

  const handleClickInputValue = (result) => {
    setSearchTerm(result);
    setHindeList(false);
  };

  // let content;
  // if (searchTerm != "") {
  //   content = searchResults.map((result, index) => (
  //     <li
  //       key={index}
  //       onClick={() => handleClickInputValue(result.category_name)}
  //     >
  //       {result.category_name}
  //     </li>
  //   ));
  // }

  const InputhandleChange = (id, value) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? { ...input, value: value } : input
    );
    setInputs(newInputs);
  };

  const handleAddInput = (e) => {
    e.preventDefault();
    const newInput = { id: inputs.length + 1, value: "" };
    setInputs([...inputs, newInput]);
  };

  const handleRemoveInput = (e, id) => {
    e.preventDefault();
    const filteredInputs = inputs.filter((input) => input.id !== id);
    setInputs(filteredInputs);
  };

  const handleRemoveAllInputs = () => {
    setInputs([]);
  };

  return (
    <div>
      <div class="content-wrapper">
        <div className="row">
          <div class="page-header">
            <h3 class="page-title"> Add Sub Category </h3>
          </div>
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <form class="input-group">
                  <div class="form-group d-flex">
                    {/* <input
                      type="text"
                      class="form-control"
                      name="category_name" 
                      value={searchTerm}
                      style={{ width: "800px" }}
                      placeholder="Enter SubCategory Name"
                      onChange={handleChange}
                    /> */}
                    <select
                      class="form-control form-control-lg "
                      name="category_name"
                      value={searchTerm}
                      style={{ width: "400px" }}
                      onChange={handleChange}
                    >
                      <option value="">Select SubCategory</option>
                      {searchResults.map((result, index) => (
                        <option key={index} value={result.category_name}>
                          {result.category_name}
                        </option>
                      ))}
                    </select>

                    <button
                      class="btn btn-gradient-primary me-2"
                      onClick={(e) => handleAddInput(e)}
                      style={{ marginLeft: "40px" }}
                    >
                      Add Input
                    </button>
                  </div>
                  {/* <div  className="list-id">{hideList ? content : ""}</div> */}

                  <div class="form-group ">
                    <div class="col-sm-12">
                      <div class="row">
                        {inputs.map((input) => (
                          <>
                            <div class="col-sm-5" key={input.id}>
                              <div class="form-group ">
                                <input
                                  type="text"
                                  class="form-control form-control-lg  placeholder-smaller"
                                  placeholder="Enter Sub Name Like Address,City,State..."
                                  value={input.value}
                                  onChange={(e) =>
                                    InputhandleChange(input.id, e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div class="col-sm-1  ">
                              <button
                                class="btn btn-gradient-primary me-2"
                                onClick={(e) => handleRemoveInput(e, input.id)}
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-gradient-primary " type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th> Sub Category </th>
                      <th> Category </th>
                      <th> Group name </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td> Sub Category 1 </td>
                      <td> Category 1 </td>
                      <td> Group 1 </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <span class="page-link">Previous</span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item active">
                      <span class="page-link">
                        2<span class="sr-only">(current)</span>
                      </span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
