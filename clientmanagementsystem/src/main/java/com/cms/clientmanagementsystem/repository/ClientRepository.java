package com.cms.clientmanagementsystem.repository;

import com.cms.clientmanagementsystem.model.ClientData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends MongoRepository<ClientData, ObjectId> {
    Optional<ClientData> findByRegistrationNo(String RegistrationNo);
    public void deleteByRegistrationNo(String RegistrationNo);
}
