package com.workoutbuddy.server;

import com.workoutbuddy.server.model.Workout;
import com.workoutbuddy.server.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class 	ServerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Autowired
	WorkoutRepository repository;

	@Override
	public void run(String... args) throws Exception {
	}
}