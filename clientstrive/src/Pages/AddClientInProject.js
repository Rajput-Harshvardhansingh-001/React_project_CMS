import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddClientInProject = () => {

    const [projectTitle, setProjectTitle] = useState("");

    const enterProjectTitle = (e) =>{
        setProjectTitle(e.target.value)
    }
     const [clientObj, setClientObj] = useState({
      clientPersonName: "",
      companyName: "",
      city: "",
      gstNo: "",
      contactNo: "",
      registrationNo: "",
    });


        const getClientFormData = (event,key) => {
    setClientObj((obj) => ({ ...obj,[key]:event.target.value }))
  };



    const postClientInProject = async () => {
    debugger;
    try {
        debugger;
      const client = await axios.post(
        "http://localhost:8080/api/clientproject/addClientInProject/"+{projectTitle},
        clientObj
      );
      debugger;
      if (client.status == 200) {
        alert("client added in project succussfully");
      } else {
        alert("this is problem to add client in project !");
      }
    } catch (error) {
      debugger;
      alert(error.message);
    }
  };


    return (
        <div>
        <form>
            
             <h6 className="fw-bold">Clients Details</h6>

            {/* Map Clients Array Here */}
            {[1].map((client, index) => (
              <div key={index} className="border rounded p-3 mb-3 bg-light">

                <div className="mb-2">
                  <label className="form-label">Contact Person Name</label>
                  <input type="text" onChange={(event)=>{getClientFormData(event,'clientPersonName')}} className="form-control" />
                </div>

                <div className="mb-2">
                  <label className="form-label">Company Name</label>
                  <input type="text" onChange={(event)=>{getClientFormData(event,'companyName')}} className="form-control" required/>
                </div>

                <div className="mb-2">
                  <label className="form-label">Registration No. (immutable)</label>
                  <input type="email" onChange={(event)=>{getClientFormData(event,'registrationNo')}} className="form-control" required/>
                </div>
                
                <div className="mb-2">
                  <label className="form-label">City</label>
                  <input type="text" onChange={(event)=>{getClientFormData(event,'city')}} className="form-control" required/>
                </div>

                <div className="mb-2">
                  <label className="form-label">ContactNo</label>
                  <input type="tel" onChange={(event)=>{getClientFormData(event,'contactNo')}} className="form-control" required/>
                </div>

                <div className="mb-2">
                  <label className="form-label">Gst No.</label>
                  <input type="text" onChange={(event)=>{getClientFormData(event,'gstNo')}} className="form-control" required/>
                </div>

                <div className="mb-2">
                  <label className="form-label">Project Title</label>
                  <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="form-control" required/>
                </div>
              </div>
            ))}
        </form>



 {/* ---------- ACTION BUTTONS ---------- */}
            <div className="d-flex gap-2">
              <button type="submit" onClick={()=>{postClientInProject();}} className="btn btn-success w-50">
                Save
              </button>
              <button type="reset" className="btn btn-danger w-50" >
                Cancel
              </button>
            </div>
        </div>
    );
};

export default AddClientInProject;