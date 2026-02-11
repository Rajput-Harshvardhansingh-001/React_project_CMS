package com.cms.clientmanagementsystem.service;

import com.cms.clientmanagementsystem.model.ClientData;
import com.cms.clientmanagementsystem.model.ClientProjects;
import com.cms.clientmanagementsystem.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClientProjectService {
    @Autowired
    ProjectRepository projectRepository;

    @Transactional
    public boolean addNewProject(ClientProjects projectData){
        if(projectData!=null){
            projectRepository.save(projectData);
            return true;
        }
        return false;

    }

    @Transactional
    public boolean addClientInProjects(ClientProjects project, ClientData clientData){
        if(project!=null){

            return true;
        }
        return false;
    }

    public List<ClientProjects> getAllClientProject(){
        return projectRepository.findAll();
    }

    public ClientProjects getProjectByTitle(String title){
        return projectRepository.findByProjectTitle(title);
    }

    @Transactional
    public boolean deleteProjectByTitle(String title){
        if(!title.isEmpty()){
        projectRepository.deleteByProjectTitle(title);
        return true;
        }
        return false;
    }
}
