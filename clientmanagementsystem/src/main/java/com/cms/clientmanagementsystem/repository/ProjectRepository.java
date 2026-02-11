package com.cms.clientmanagementsystem.repository;

import com.cms.clientmanagementsystem.model.ClientProjects;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<ClientProjects, ObjectId> {
    ClientProjects findByProjectTitle(String projectTitle);
    void deleteByProjectTitle(String projectTitle);
}
