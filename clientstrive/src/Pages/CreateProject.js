import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {

    const history = useNavigate();

    const backToProjectList = ()=>{
        history("/clientprojects");
    }



      const [projectObj,setProjectObj] = useState({
    leadByEmpId:"",
    projectTitle:"",
    startDate:"",
    excpectedDate:"",
    projectCost:"",
    projectDetails:"",
    contactPersonEmail:"",
    clients:[]
  });

   

    const getProjectFromData = (event,key)=>{
        setProjectObj((obj)=>({...obj,[key]:event.target.value}));
    }

  
  const postProject = async() =>{
    try {
      const projectData = await axios.post("http://localhost:8080/api/clientproject/addProject",projectObj);
      if(projectData.status==200){
        alert("project added successfully");
      }
      else{
        alert("something goes wong while saving new project! Check Server");
      }
    } catch (error) {
      alert(error.message);
    }
  }


  return (
<div className="container-fluid mt-4">
  <div className="row  px-5 pb-4">

    {/* ================= PROJECT FORM ================= */}
    <div className="col-md-12">
      <div className="card shadow-sm">
        <div className="card-header bg-warning d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Add Client Project</h5>
          <button className="btn btn-danger btn-sm" onClick={backToProjectList}>back</button>
        </div>

        <div className="card-body">
          <form>

            {/* ---------- MAIN PROJECT FIELDS ---------- */}

            <div className="mb-3">
              <label className="form-label">Project Title</label>
              <input type="text" onChange={(event)=>{getProjectFromData(event,'projectTitle')}} className="form-control" required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input type="date" onChange={(event)=>{getProjectFromData(event,'startDate')}} className="form-control" required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Person Mail</label>
              <input type="email" onChange={(event)=>{getProjectFromData(event,'contactPersonEmail')}} className="form-control" required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Expected Date</label>
              <input type="date" onChange={(event)=>{getProjectFromData(event,'excpectedDate')}} className="form-control" required/>
            </div>

             <div className="mb-3">
              <label className="form-label">Project Cost</label>
              <input type="number" onChange={(event)=>{getProjectFromData(event,'projectCost')}} className="form-control" required/>
            </div>

             <div className="mb-3">
              <label className="form-label">leadByEmpId</label>
              <input type="text" onChange={(event)=>{getProjectFromData(event,'leadByEmpId')}}  className="form-control" required/>
            </div>

             <div className="mb-3">
              <label className="form-label">Project Details</label>
              <textarea  onChange={(event)=>{getProjectFromData(event,'projectDetails')}} className="form-control" required></textarea>
            </div>

            {/* ---------- CLIENT SUB FORM ---------- */}

            <hr />
           

       

            {/* ---------- ACTION BUTTONS ---------- */}
            <div className="d-flex gap-2">
              <button type="submit" onClick={()=>{postProject();}} className="btn btn-success w-50">
                Save
              </button>
              <button type="reset" className="btn btn-danger w-50" onClick={backToProjectList}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>

  </div>
</div>

  );
};

export default CreateProject;
