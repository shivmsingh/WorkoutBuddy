package com.workoutbuddy.server.repository;

import com.workoutbuddy.server.model.Workout;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    List<Workout> findByPart(String part, Sort sortByCreatedAtDesc);
}
