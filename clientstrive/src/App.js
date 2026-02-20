import "./App.css";
import AddClientInProject from "./Pages/AddClientInProject";
import Client from "./Pages/Client";
import ClientProjects from "./Pages/ClientProjects";
import CreateProject from "./Pages/CreateProject";
import Employee from "./Pages/Employee";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      {/* 
      for render the path normaly(in plain HTML) we use the ankar tag <a> but in react we use react-router-dom 
      feature that is Link tag that uses attribute as to={} instead of href='' ,this routes the path using routing and this Link will work under 
      BrowserRouter so keep it inside it
      .
      .
      some should be deault run on main index page as home page in 3000 port
      that is called default router
      so for this we need to set default router that's path would be empty ''

      keep the input tag close like this <input/>
    */}
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/client"}>
              Logo
            </Link>{" "}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mynavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
              <ul className="navbar-nav me-auto">
                <li className="nav-item" style={{ marginTop: "-12px" }}>
                  <Link className="nav-link active" to={"/client"}>
                    Client
                  </Link>{" "}
                </li>
                <li className="nav-item" style={{ marginTop: "-12px" }}>
                  <Link className="nav-link active" to={"/employee"}>
                    Employee
                  </Link>
                </li>
                <li className="nav-item" style={{ marginTop: "-12px" }}>
                  <Link className="nav-link active" to={"/clientprojects"}>
                    Client'sProjects
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
                />
                <button className="btn btn-primary" type="button">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <h2 className="mb-4 mt-4 text-center">Client Management System</h2>
        {/*Link is for Naviagtion of route*/}
        {/* <Link to={"/client"}>client_here</Link>{" "}
        
        <br />
        <Link to={"/employee"}>employee_here</Link> */}
        <Routes>
          <Route path="" element={<Employee />}></Route>
          <Route path="client" element={<Client></Client>}></Route>
          <Route path="employee" element={<Employee />}></Route>
          <Route path="clientprojects" element={<ClientProjects/>}></Route>
          <Route path="createproject" element={<CreateProject/>}></Route>
          <Route path="addclientinproject" element={<AddClientInProject/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
