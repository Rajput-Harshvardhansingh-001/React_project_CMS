package com.cms.clientmanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Document
@Data
@NoArgsConstructor
public class ClientProjects {

    @Id
    private ObjectId clientProjectId;
    @NotNull
    private String leadByEmpId;

    @NotNull
    @Indexed(unique = true)
    private String projectTitle;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd")
    private Date startDate;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd")
    private Date excpectedDate;

    @NotNull
    private String projectCost;

    @NotNull
    private String projectDetails;

    @NotNull
    private String contactPersonEmail;
    @DBRef
    private List<ClientData> clients = new ArrayList<>();
}
