import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";

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
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard></Dashboard>
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile></CreateProfile>
                </PrivateRoute>
              }
            ></Route>{" "}
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
