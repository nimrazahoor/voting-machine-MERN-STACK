import  { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../APIcalls/APIs";

import "./style.css";

function Login() {
  const [User, setUser] = useState({ email: "", password: "", userType: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(User);
      sessionStorage.setItem("jwt", response.token);
      sessionStorage.setItem("userType", response.userType);

      if (response.status !== 400) {
        alert(response.message);
        if (User.userType === "Admin") {
          navigate("/admin-dashboard");
        }
        if (User.userType === "Voter") {
          navigate("/voter-dashboard");
        }
        if (User.userType === "Candidate") {
          navigate("/candidate-dashboard");
        }
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Error Login:" + error.response.message);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <form className="container card w-25" onSubmit={handleSubmit}>
        <label>Select User Type</label>
        <br />

        <select
          className="form-input"
          name="userType"
          value={User.userType}
          onChange={handleChange}
        >
          <option value="">Select User Type</option>
          <option value="Voter">Voter</option>
          <option value="Candidate">Candidate</option>
          <option value="Admin">Admin</option>
        </select>

        <br />
        <label>Email:</label>
        <br></br>
        <input
          className="form-input"
          type="email"
          name="email"
          value={User.email}
          placeholder="Enter your Email"
          onChange={handleChange}
        ></input>
        <br />
        <label>Password:</label>
        <br />
        <input
          className="form-input"
          type="password"
          name="password"
          value={User.password}
          placeholder="Enter your Password"
          onChange={handleChange}
        ></input>
        <br />

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
