import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    //we must do it
    e.preventDefault();
    console.log("success");
  };

  // just a test we do it i redux
  //   const onSubmit = async (e) => {
  //     //we must do it
  //     e.preventDefault();
  //     if (password != password2) {
  //       console.log("password do not match");
  //     } else {
  //       console.log(formData);
  //       const newUser = {
  //         name,
  //         email,
  //         password,
  //       };
  //       try {
  //         const config = {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         };
  //         const body = JSON.stringify(newUser);
  //         const res = await axios.post("/api/users", body, config);
  //         console.log(res.data);
  //       } catch (err) {
  //         console.error(err.response.data);
  //       }
  //     }
  //   };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
