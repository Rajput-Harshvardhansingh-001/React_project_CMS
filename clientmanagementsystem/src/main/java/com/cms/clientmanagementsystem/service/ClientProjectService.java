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

    @Autowired
    ClientService clientService;

    @Transactional
    public boolean addNewProject(ClientProjects projectData){
        if(projectData!=null){
            projectRepository.save(projectData);
            return true;
        }
        return false;

    }

    @Transactional
    public boolean addNewClientInProjects(String projectTitle, ClientData clientData){
        if(!projectTitle.isEmpty() && clientData!=null){
            ClientProjects project = projectRepository.findByProjectTitle(projectTitle);
            if(project!=null){
                if(clientService.addNClient(clientData)){
                    project.getClients().add(clientData);
                    projectRepository.save(project);
                    return true;
                }
            }
        }
        return false;
    }

    public List<ClientProjects> getAllClientProject(){
        return projectRepository.findAll();
    }

    public ClientProjects getProjectByTitle(String title){
        return projectRepository.findByProjectTitle(title);
    }

    public List<ClientData> getClientsByTitle(String title){
        if(!title.isEmpty()){
            ClientProjects project = projectRepository.findByProjectTitle(title);
            return project.getClients().isEmpty() ? null:project.getClients();
        }
        return  null;
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
