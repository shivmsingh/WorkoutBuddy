package com.workoutbuddy.server.repository;

import com.workoutbuddy.server.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
}
