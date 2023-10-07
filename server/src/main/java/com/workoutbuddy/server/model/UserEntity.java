package com.workoutbuddy.server.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserEntity {

    @Id
    private String _id;

    private String username;

    private String password;

    private List<Role> roles = new ArrayList<>();
}
