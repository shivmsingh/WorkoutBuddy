import React from "react";
import WorkoutForm from "./WorkoutForm";

const AddWorkoutModal = ({ showModal, setShowModal }) => {
  if (showModal) {
    return (
      <dialog open style={{ zIndex: "100000" }}>
        <article>
          <header>
            <button
              to="#"
              aria-label="Close"
              class="close outline contrast"
              onClick={() => setShowModal(false)}
            />
            <h2>Add Workout</h2>
          </header>
          <WorkoutForm />
        </article>
      </dialog>
    );
  } else {
    return (
      <dialog style={{ zIndex: "100000" }}>
        <article>
          <header>
            <button
              to="#"
              aria-label="Close"
              class="close outline contrast"
              onClick={() => setShowModal(false)}
            />
            <h2>Add Workout</h2>
          </header>
          <WorkoutForm />
        </article>
      </dialog>
    );
  }
};

export default AddWorkoutModal;
