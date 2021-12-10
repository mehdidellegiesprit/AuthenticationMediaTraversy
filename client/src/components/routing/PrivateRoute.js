import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// l rest anything passed  with component

const PrivateRoute = ({ children, auth: { isAuthenticated, loading }}) => {
  console.log("PrivateRoute component");

  console.log("isAuthenticated?");
  console.log(isAuthenticated);
  console.log("loading?");
  console.log(loading);
  console.log("props.children === ");
  console.log(children);


  return !isAuthenticated && !loading ? <Navigate to="/login" /> : children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
