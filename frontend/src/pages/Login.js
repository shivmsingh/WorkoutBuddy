import React, { useState } from "react";
import { useNavigate } from "react-router";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };
    try {
      const response = await fetch("https://workoutbuddy-t2yc.onrender.com/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      localStorage.setItem("accessToken", json.accessToken);
      setUsername("");
      setPassword("");
      setError(null);
      navigate(0);
    } catch (error) {
      setError("Invalid username or password");
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

        <input type="submit" value="Login" />
        {error && <button disabled>{error}</button>}
      </form>
    </div>
  );
}

export default Login;
