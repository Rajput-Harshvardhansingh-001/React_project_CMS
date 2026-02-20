package com.cms.clientmanagementsystem.controller;

import com.cms.clientmanagementsystem.model.ClientData;
import com.cms.clientmanagementsystem.model.ClientProjects;
import com.cms.clientmanagementsystem.service.ClientProjectService;
import com.cms.clientmanagementsystem.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/clientproject")
public class ClientProjectController {

    @Autowired
    private ClientProjectService clientProjectService;

    @GetMapping()
    public List<ClientProjects> getAllProjects(){
        return clientProjectService.getAllClientProject();
    }

    @GetMapping("/{title}")
    public ClientProjects getProjectByTitle(@PathVariable("title") String title){
        return clientProjectService.getProjectByTitle(title);
    }

    @GetMapping("/getClientsByProjectTitle/{title}")
    public ResponseEntity<?> getClientsByProjectTitle(@PathVariable("title") String title){
        List<ClientData> clientsOfProject = clientProjectService.getClientsByTitle(title);
        if(clientsOfProject != null && !clientsOfProject.isEmpty()){
            return new ResponseEntity<>(clientsOfProject,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/addProject")
    public ResponseEntity<?> addNewProject(@RequestBody ClientProjects projectData){
        if(clientProjectService.addNewProject(projectData)){
            return new ResponseEntity<ClientProjects>(projectData,HttpStatus.OK);
        }
        return new ResponseEntity<ClientProjects>(projectData,HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/addClientInProject/{projectTitle}")
    public ResponseEntity<?> addNewClientInProject(@PathVariable("projectTitle") String projectTitle, @RequestBody ClientData clientData){
        if(clientProjectService.addNewClientInProjects(projectTitle, clientData)){
            return new ResponseEntity<ClientData>(clientData,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("delete/{title}")
    public ResponseEntity<?> deleteProjectByTitle(@PathVariable("title") String title){
        if(clientProjectService.deleteProjectByTitle(title)){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }



}
