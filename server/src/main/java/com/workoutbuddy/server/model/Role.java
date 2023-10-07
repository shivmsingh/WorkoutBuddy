package com.workoutbuddy.server.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "roles")
public class Role {

    @Id
    private String _id;

    private String name;
}
