package com.workoutbuddy.server.model;

import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("workouts")
public class Workout {
    @Id
    private String _id;
    private String title;
    private int reps;
    private int load;

    private String part;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @Version
    private int version;

    public Workout(String title, int reps, int load, String part) {
        super();
        this.title = title;
        this.reps = reps;
        this.load = load;
        this.part = part;
    }

    @Override
    public String toString() {
        return String.format(
                "Workout[id='%s', title='%s', reps='%d', load='%d', part='%s', createdAt='%s', updatedAt='%s', version='%s']",
                _id, title, reps, load, part, createdAt, updatedAt, version);
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getPart() {
        return part;
    }

    public void setPart(String part) {
        this.part = part;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getLoad() {
        return load;
    }

    public void setLoad(int load) {
        this.load = load;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
