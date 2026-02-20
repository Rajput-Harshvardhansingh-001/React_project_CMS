import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProject } from "../service/Master";

const ClientProjects = () => {
  const history = useNavigate();

  const goToCreateProject = () => {
    history("/createproject");
  };

   const goToAddClientInProject = () =>{
        history("/addclientinproject");
      }
  

  const [projectList, setProjectList] = useState([]);

  const [projectObj, setProjectObj] = useState({
    leadByEmpId: "",
    projectTitle: "",
    startDate: "",
    excpectedDate: "",
    projectCost: "",
    projectDetails: "",
    contactPersonEmail: "",
    clients: [],
  });

  const [clientList, setClientList] = useState([]);

  const [clientObj, setClientObj] = useState({
    clientPersonName: "",
    companyName: "",
    city: "",
    gstNo: "",
    contactNo: "",
    registrationNo: "",
    empStrength:"",
    address:""
  });

  const [showClientTable, setShowClientTable] = useState(false);

  const showClients = () => {
    setShowClientTable(true);
  };

  const hideClients = () =>{
    setShowClientTable(false);
  }
  const getAllProjects = async () => {
    try {
      getAllProject().then((data)=>{
        setProjectList(data);
      })
      ;
    } catch (error) {
      alert(error.message);
    }
  };

  const getProjectClients = async(title) =>{
    try {
      const projectClients = await axios.get("http://localhost:8080/api/clientproject/getClientsByProjectTitle/"+title);
      setClientList(projectClients.data);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getAllProjects();
  });



  return (
    <div className="px-1">
      <div className="container-fluid mt-4">
        <div className="d-flex  justify-content-center align-items-center gap-2">
          {/*== Project List Section ==   col-md-12*/}
          <div className={ showClientTable ==false ? "col-md-12":"col-md-8"}>
            <div className="card shadow-sm">
              <div className="card-header bg-success d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-light">Client's Project List</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={goToCreateProject}
                >
                  Add New
                </button>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>SrNo</th>
                        <th>Project Title</th>
                        <th>Start Date</th>
                        <th>Contact Person Mail</th>
                        <th>Expected Date</th>
                        <th>Clients</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {/*<!-- Dynamic Data Will Come Here -->*/}
                      {projectList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.projectTitle}</td>
                            <td>{item.startDate}</td>
                            <td>{item.contactPersonEmail}</td>
                            <td>{item.excpectedDate}</td>
                            {/* this button call the client by project title and show the table of fetched client data table */}
                            <td>
                              <button
                                className="btn btn-light btn-sm"
                                onClick={()=>{getProjectClients(item.projectTitle); showClients()}}
                              >
                                show clients
                              </button>
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
          {/*== Client list of a project == col-md-4*/}
          <div className={showClientTable == true ? "card shadow-sm  col-md-4 " : "d-none"}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Client Details</h5>
              <div className="d-flex flex-row gap-4">
                <button className="btn btn-primary btn-sm" onClick={goToAddClientInProject}>Add Client</button>
              <button className="btn btn-danger btn-sm px-4" onClick={hideClients}>Close</button>
              </div>
            </div>

            <div className="card-body px-2 pt-1">
              <div className="table-responsive ">
                <table className="table table-striped table-hover align-middle ">
                  <thead className="table-dark">
                    <tr>
                      <th>SrNo.</th>
                      <th>Client Name</th>
                      <th>Company Name</th>
                      <th>Reg No</th>
                      <th>Contact No</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Map Client Data Here */}
                    {Array.isArray(clientList) &&
                    clientList.map((client, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{client.clientPersonName}</td>
                        <td>{client.companyName}</td>
                        <td>{client.registrationNo}</td>
                        <td>{client.contactNo}</td>
                      </tr>
                    ))}

                    {/* Empty State UI */
                    clientList.length === 0 &&
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No Clients Added Yet
                      </td>
                      <td></td>
                    </tr>
                    }
                  </tbody>
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientProjects;
