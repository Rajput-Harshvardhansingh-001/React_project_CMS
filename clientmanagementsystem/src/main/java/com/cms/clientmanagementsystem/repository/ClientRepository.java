package com.cms.clientmanagementsystem.repository;

import com.cms.clientmanagementsystem.model.ClientData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends MongoRepository<ClientData, ObjectId> {
    public ClientData findByRegistrationNo(String registrationNo);
}
