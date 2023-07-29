import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./style.css";
function Signup() {
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cnic: "",
    picture: null,
    constituency: "",
  });
  const navigate = useNavigate();
  const [constituencyName, setConstituencyName] = useState("");
  const [constituencies, setConstituencies] = useState();
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/constituencies"
        );
        setConstituencies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching constituencies:", error);
      }
    };

    fetchConstituencies();
  }, []);

  const handlePictureChange = (event) => {
    setUser({ ...User, picture: event.target.files[0] });
  };
  const pictureUrl = User.picture ? URL.createObjectURL(User.picture) : null;
  const handleSubmit = async (values) => {
    //event.preventDefault();
    console.log("handle submit working");
    const formData = new FormData();
    formData.append("picture", User.picture);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("email", values.email);
    formData.append("cnic", values.cnic);
    formData.append("constituency", constituencyName);

    try {
      console.log("values", formData);
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from server:", response.data);
      if (response.status === 201) {
        alert("registered Successfully");
        navigate("/login");
      } else {
        alert("Server error");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <Formik
          onSubmit={handleSubmit}
        initialValues={{
          username: "",
          email: "",
          password: "",
          cnic: "",
          picture: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          } else if (!/^[a-zA-Z\s]{1,50}$/.test(values.username)) {
            errors.username =
              "Name should contain 1 to 50 characters, with only letters and spaces.";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
          ) {
            errors.password = "Strong password 8 digit with a letter";
          }
          if (!values.cnic) {
            errors.cnic = "CNIC is required";
          } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(values.cnic)) {
            errors.cnic =
              "Please enter a valid Pakistani CNIC (e.g., 12345-6789101-2)";
          } 
          return errors;
        }}
      >
        {() => (
          <Form className="form" encType="multipart/form-data">
            <label>Name: </label>
            <Field className="form-input" type="text" name="username" />

            <br />
            <ErrorMessage className="error-message" name="username" />
            <br />
            <label>Email: </label>
            <Field className="form-input" type="email" name="email" />
            <br />
            <ErrorMessage className="error-message" name="email" />
            <br />
            <label>Password: </label>
            <Field className="form-input" type="password" name="password" />
            <br />
            <ErrorMessage className="error-message" name="password" />
            <br />
            <label>constituency / Halka: </label>
            {/* <Field as="select" className="form-input" name="constituency">
             <option value="">Select Your constituency </option>
             <option value="constituency1">constituency1</option>
             <option value="constituency2">constituency2</option>
             <option value="constituency3">constituency3</option>
             <option value="constituency4">constituency4</option>
           </Field> */}
            <select
              className="form-input"
              name="constituency"
              value={constituencyName}
              onChange={(e) => setConstituencyName(e.target.value)}
            >
              <option value="">Select Your constituency</option>
              {constituencies?.map((constituency) => (
                <option key={constituency._id} value={constituency.name}>
                  {constituency.name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label>Upload Picture: </label>
            <input
              className="form-input"
              type="file"
              name="picture"
              accept="image/*"
              onChange={handlePictureChange}
            />
            {pictureUrl && (
              <img
                src={pictureUrl}
                alt="Uploaded"
                className="uploaded-picture"
              />
            )}
            <label>CNIC</label>
            <Field className="form-input" type="text" name="cnic" />
            <br />
            <br />
            <button className="submit-button" type="submit" >
              Submit
            </button>
            <br />
            <ErrorMessage className="error-message" name="cnic" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
