package com.cms.clientmanagementsystem.controller;

import com.cms.clientmanagementsystem.model.ClientData;
import com.cms.clientmanagementsystem.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/getByRegNo/{regNo}")
    public ResponseEntity<?> getClientByRegNo(@PathVariable String regNo){
        ClientData client = clientService.getClientByRegNo(regNo);
        if(client != null){
            return new ResponseEntity<>(client,HttpStatus.OK);
        }
       return new ResponseEntity<ClientData>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/delete/{clientRegNo}")
    public ResponseEntity<?> deleteClient(@PathVariable String clientRegNo){
        boolean isDel = clientService.deleteClientByRegNo(clientRegNo);
        if(isDel){
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

    }

    @PutMapping("/update/{clientRegNo}")
    public ResponseEntity<?> updateClient(@PathVariable("clientRegNo") String clientRegNo, @RequestBody ClientData clientData){
        if(clientService.updateClient(clientRegNo, clientData)){
            return new ResponseEntity<>(clientService.getClientByRegNo(clientRegNo), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
