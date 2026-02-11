package com.cms.clientmanagementsystem.controller;

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

    @PostMapping("/addProject")
    public ResponseEntity<?> addNewProject(@RequestBody ClientProjects projectData){
        if(clientProjectService.addNewProject(projectData)){
            return new ResponseEntity<ClientProjects>(projectData,HttpStatus.OK);
        }
        return new ResponseEntity<ClientProjects>(projectData,HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("delete/{title}")
    public ResponseEntity<?> deleteProjectByTitle(@PathVariable("title") String title){
        if(clientProjectService.deleteProjectByTitle(title)){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }



}
