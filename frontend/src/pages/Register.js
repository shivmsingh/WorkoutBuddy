import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const user = { username, password };

      const response = await fetch("https://workoutbuddy-t2yc.onrender.com/api/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response;

      if (json.ok) {
        setMessage(`${username}, you have been registered succesfully!`);
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        setMessage("Username Already Taken");
      }
    } catch (error) {
      setMessage("Server Error!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Username
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
        </fieldset>

        <input type="submit" value="Register" />
        {message && <button disabled>{message}</button>}
      </form>
    </div>
  );
}

export default Register;
