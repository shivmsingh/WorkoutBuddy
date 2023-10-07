package com.workoutbuddy.server.controller;

import com.workoutbuddy.server.model.Workout;
import com.workoutbuddy.server.repository.WorkoutRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
class WorkoutController {
        private final WorkoutRepository repository;

        private String getCurrentUsername() {
        // Assuming your UserDetails contain the username
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
                return ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
            } else {
                // If UserDetails is not available, you might need to adjust based on your authentication setup
                return null;
            }
        }



        WorkoutController(WorkoutRepository repository) {
            this.repository = repository;
        }


        // Aggregate root
        // tag::get-aggregate-root[]
        @GetMapping("/workouts")
        List<Workout> all() {
           String username = getCurrentUsername();
           Sort sortByCreatedAtDesc = Sort.by(Sort.Direction.DESC, "createdAt");
           return repository.findBycreatedBy(username,sortByCreatedAtDesc);
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
            String username = getCurrentUsername();
            return repository.findByIdAndCreatedBy(id,username);
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
        @ResponseStatus(code = HttpStatus.OK, reason = "OK")
        void deleteWorkout(@PathVariable String id) {
            String username = getCurrentUsername(); 
            repository.deleteById(id);
        }

    }
