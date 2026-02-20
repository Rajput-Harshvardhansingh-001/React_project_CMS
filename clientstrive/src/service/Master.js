import axios from "axios";

// It this file consists all api functionc call

const getAllClients = async() => {
     const clientData = await axios.get("http://localhost:8080/api/client");
     return clientData.data;
}
const getAllProject = async () =>{
    const projectsData = await axios.get("http://localhost:8080/api/clientproject");
    return projectsData.data;
}
export {getAllClients,getAllProject}