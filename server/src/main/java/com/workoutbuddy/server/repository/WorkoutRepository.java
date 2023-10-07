package com.workoutbuddy.server.repository;

import com.workoutbuddy.server.model.Workout;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends MongoRepository<Workout, String> {


    List<Workout> findBycreatedBy(String createdBy, Sort sortByCreatedAtDesc);
    @Query("{'_id': ?0, 'createdBy': ?1}")
    Optional<Workout> findByIdAndCreatedBy(String id, String createdBy);


}
