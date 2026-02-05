package com.cms.clientmanagementsystem.controller;

import com.cms.clientmanagementsystem.model.ClientData;
import com.cms.clientmanagementsystem.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @PostMapping
    public ResponseEntity<?> addClient(@RequestBody ClientData clientData){

        if(clientService.addNClient(clientData)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public List<ClientData> getAllClient(){
        return clientService.getClients();
    }

    @PutMapping("/update/{clientRegNos}")
    public ResponseEntity<?> updateClient(@PathVariable String clientRegNo, @RequestBody ClientData clientData){
        if(clientService.updateClient(clientRegNo , clientData)){
            return new ResponseEntity<>(clientService.getClientByRegNo(clientRegNo), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
