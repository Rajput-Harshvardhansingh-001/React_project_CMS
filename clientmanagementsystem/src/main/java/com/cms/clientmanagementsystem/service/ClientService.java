package com.cms.clientmanagementsystem.service;

import com.cms.clientmanagementsystem.model.ClientData;
import com.cms.clientmanagementsystem.repository.ClientRepository;
import com.mongodb.MongoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public List<ClientData> getClients() {
         return  clientRepository.findAll();
    }


    public boolean addNClient(ClientData client) {
        if(client.getClientPersonName().isBlank() && client.getCompanyName().isBlank() && client.getContactNo().isBlank() && client.getGstNo().isBlank() && client.getRegistrationNo().isBlank()){
            try{
                throw new NullPointerException("Client name, ContactNo and Company name can not be null");
            }
            catch (NullPointerException e){
                System.err.println(e.getMessage());
            }
            return false;
        }
        else{
            try{
                clientRepository.save(client);
            }
            catch (MongoException e){
                System.err.println(e.getMessage());
            }

            return true;
        }

    }

    public ClientData getClientByRegNo(String reg){
        return clientRepository.findByRegistrationNo(reg);
    }

    @Transactional
    public boolean updateClient(String clientRegNo, ClientData newClientData) {
        if (clientRegNo == null) {
            return false;
        }
        ClientData getOldClient = clientRepository.findByRegistrationNo(clientRegNo);
        if (getOldClient.getClientPersonName().isBlank()) {
            try {
                throw new NullPointerException("No such client is exist");
            } catch (NullPointerException e) {
                System.err.println(e.getMessage());
                return  false;
            }
        }
        else {
            getOldClient.setClientPersonName(newClientData.getClientPersonName());
            getOldClient.setCompanyName(newClientData.getCompanyName());
            getOldClient.setCity(newClientData.getCity());
            getOldClient.setAddress(newClientData.getAddress());
            getOldClient.setContactNo(newClientData.getContactNo());
            getOldClient.setEmpStrength(newClientData.getEmpStrength());
            clientRepository.save(getOldClient);
            return true;
        }


    }
}
