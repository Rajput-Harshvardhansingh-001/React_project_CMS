package com.cms.clientmanagementsystem.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

    @Document(collection = "clientdata")
    @Data
    @NoArgsConstructor
    public class ClientData {
        @Id
        private ObjectId clientId;
        @NonNull
        private String clientPersonName;
        @NonNull
        private String companyName;
        @NonNull
        private String city;
        @NonNull
        private String gstNo;
        @NonNull
        private String contactNo;
        @Indexed(unique = true)
        @NonNull
        private String registrationNo;
        private String empStrength;
        private String address;

    }
