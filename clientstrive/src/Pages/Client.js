import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { data } from "react-router-dom";
import { cleanup } from "@testing-library/react";
const Client = () => {
  const [clientList, setClientList] = useState([]);

  const [clientFormVisible, setClientFormVisible] = useState(false);

  //to send the post api call we need object so for that also we need to create state with all fields as properties "" as String and 0 for number
  const [clientObj, setClientObj] = useState({
    clientPersonName: "",
    companyName: "",
    city: "",
    gstNo: "",
    contactNo: "",
    registrationNo: "",
  });

  /*to get the data from html from to object's field we have to create dynamic function
  this function would have 2 param as 'event' and 'key' then it will use spread operator to change the object*/

  const getClientFormData = (event, key) => {
    setClientObj((obj) => ({ ...obj, [key]: event.target.value }));
  };
  /*to call api while page load, we use useEffect hook , it runs like constructor , and when any state change in page then it also run automaticaly */
  /*to call ony page load we put , [] in end of useEffect*/
  useEffect(() => {
    console.log("mai hu useEffect");
    getAPICall();
  }, []);

  /*
    whenever use hooks like useState then the whole component  is rerender
    or when a hook change state on any variable then it rerender whole component*/

  const getAPICall = async () => {
    const clientData = await axios.get("http://localhost:8080/api/client");
    setClientList(clientData.data);
  };

  const postAPICall = async () => {
    debugger;
    try {
      const client = await axios.post(
        "http://localhost:8080/api/client",
        clientObj,
      );
      debugger;
      if (client.status == 200) {
        alert("client added succussfully");
        getAPICall();
      } else {
        alert("this is problem buddy to send the data ! ja Check kr");
      }
    } catch (error) {
      debugger;
      alert(error.message);
    }
  };

  // const updateClientCall = async (clientObj) => {
  //   debugger;
  //   try {
  //     const clientup = await axios.put(
  //       `http://localhost:8080/api/client/update/${clientObj.registrationNo}`,
  //       clientObj,
  //     );
  //     if (clientup.status == 200) {
  //       alert(`client data has been updated`);
  //       getAPICall();
  //     } else alert("error occured!");
  //     debugger;
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const clientFormVisibility = () => {
    setClientFormVisible(true);
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 text-center">Client Management System</h2>
      {/* Client List */}
      <div className="d-flex flex-row justify-content-center  w-100 row g-4">
        <div className={clientFormVisible === true ? "col-7" : "col-12"}>
          <div className="card shadow-sm h-100 w-100">
            <div className="d-flex justify-content-between card-header bg-primary text-white py-3">
              <h5 className="mb-0">Client List</h5>
              <button
                className="btn btn-sm btn-danger"
                onClick={clientFormVisibility}
              >
                <i className="fa fa-plus"></i>
                Add new
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>SrNo.</th>
                      <th>Client Name</th>
                      <th>Company Name</th>
                      <th>City</th>
                      <th>GST No.</th>
                      <th>Contact No.</th>
                      <th>Reg No.</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*we need to iterate the tr element as many data row we get using map : ListName.map((value,index,number)= ()=>{return (repitive element) })*/}
                    {clientList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.clientPersonName}</td>
                          <td>{item.companyName}</td>
                          <td>{item.city}</td>
                          <td>{item.gstNo}</td>
                          <td>{item.contactNo}</td>
                          <td>{item.registrationNo}</td>
                          <td>
                            <div className="d-flex flex-row gap-3">
                              <button className="btn btn-danger btn-sm danger">
                                delete
                              </button>
                              <button className="btn btn-info btn-sm green">
                                update
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Client Form Card */}
        {clientFormVisible && (
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="d-flex justify-content-between card-header bg-success text-white py-3">
                <h5 className="mb-0">Add New Client</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setClientFormVisible(false);
                  }}
                >
                  <i className="fa fa-plus"></i>
                  close
                </button>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Contact Person Name</label>
                    <input
                      type="text"
                      placeholder="person name"
                      value={clientObj.clientPersonName}
                      onChange={(event) => {
                        getClientFormData(event, "clientPersonName");
                      }}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      value={clientObj.companyName}
                      onChange={(event) => {
                        getClientFormData(event, "companyName");
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Registration No. (immutable)
                    </label>
                    <input
                      type="text"
                      value={clientObj.registrationNo}
                      onChange={(event) => {
                        getClientFormData(event, "registrationNo");
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      value={clientObj.city}
                      onChange={(event) => {
                        getClientFormData(event, "city");
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Contact No.</label>
                    <input
                      type="tel"
                      value={clientObj.contactNo}
                      onChange={(event) => {
                        getClientFormData(event, "contactNo");
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">GST No.</label>
                    <input
                      type="text"
                      value={clientObj.gstNo}
                      onChange={(event) => {
                        getClientFormData(event, "gstNo");
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Employee Strength</label>
                  <textarea
                    className="form-control"
                    value={clientObj.empStrength}
                    onChange={(event) => {
                      getClientFormData(event, "empStrength");
                    }}
                    rows="2"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    value={clientObj.address}
                    className="form-control"
                    onChange={(event) => {
                      getClientFormData(event, "address");
                    }}
                    rows="2"
                  ></textarea>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    onClick={postAPICall}
                    className="btn btn-success"
                  >
                    Add Client
                  </button>
                  <button type="button" className="btn btn-secondary">
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
