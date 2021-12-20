import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
// provider will connect the redux with react because react and redux separe to each other
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

// global headers  token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* !here Alert  */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profiles" element={<Profiles />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard></Dashboard>
                </PrivateRoute>
              }
            ></Route>
            {/* create profile route */}
            <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile></CreateProfile>
                </PrivateRoute>
              }
            ></Route>{" "}
            {/* edit profile route */}
            <Route
              exact
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile></EditProfile>
                </PrivateRoute>
              }
            ></Route>
            {/* add-experience route */}
            <Route
              exact
              path="/add-experience"
              element={
                <PrivateRoute>
                  <AddExperience></AddExperience>
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/add-education"
              element={
                <PrivateRoute>
                  <AddEducation></AddEducation>
                </PrivateRoute>
              }
            ></Route>
            {/* !!!Posts */}
            <Route
              exact
              path="/posts"
              element={
                <PrivateRoute>
                  <Posts></Posts>
                </PrivateRoute>
              }
            ></Route>
            {/* Post */}
            <Route
              exact
              path="/posts/:id"
              element={
                <PrivateRoute>
                  <Post></Post>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
