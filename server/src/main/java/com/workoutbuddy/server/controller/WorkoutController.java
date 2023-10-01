package com.workoutbuddy.server.controller;

import com.workoutbuddy.server.model.Workout;
import com.workoutbuddy.server.repository.WorkoutRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://workoutbuddie.netlify.app")
class WorkoutController {
        private final WorkoutRepository repository;

        WorkoutController(WorkoutRepository repository) {
            this.repository = repository;
        }


        // Aggregate root
        // tag::get-aggregate-root[]
        @GetMapping("/workouts")
        List<Workout> all() {
            return repository.findAll();
        }
        // end::get-aggregate-root[]

        @PostMapping("/workouts")
        Workout newWorkout(@RequestBody Workout newWorkout) {
            Workout added = repository.save(newWorkout);
            System.out.println(added.toString());
            return added;
        }

        // Single item

        @GetMapping("workouts/{id}")
        Optional<Workout> one(@PathVariable String id) {
            return repository.findById(id);
        }

        @PutMapping("/workouts/{id}")
        Optional<Workout> replaceWorkout(@RequestBody Workout newWorkout, @PathVariable String id) {

            return repository.findById(id)
                    .map(workout -> {
                        workout.setTitle(newWorkout.getTitle());
                        workout.setReps(newWorkout.getReps());
                        workout.setLoad(newWorkout.getLoad());
                        return repository.save(workout);
                    });
        }

        @DeleteMapping("/workouts/{id}")
        void deleteWorkout(@PathVariable String id) {
            repository.deleteById(id);
        }
    }
