import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get profile by ID
export const getProfileById = (userID) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/" + userID);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/github/" + username);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// create or update profile
export const createProfile =
  (formData, edit = false, navigate) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log("begin formData edit");

      // console.log(formData);
      // console.log("end formData edit");

      const res = await axios.post("/api/profile", formData, config);
      console.log("*********************************************");
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created ", "success")
      );
      navigate("/dashboard");
    } catch (err) {
      console.log("err create profile !!!!!!!! ");
      console.log(err);
      if (err.response) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
      }

      dispatch({
        type: PROFILE_ERROR,
        // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
//Add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  console.log("addExperience");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE, //the same like get Profile
      payload: res.data,
    });
    dispatch(setAlert("Experience Added ", "success"));
    navigate("/dashboard");
  } catch (err) {
    console.log("err Adding Experienceinto the  profile  ");
    console.log(err);
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add  Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  console.log("addEducation");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE, //the same like get Profile
      payload: res.data,
    });
    dispatch(setAlert("Education Added ", "success"));
    navigate("/dashboard");
  } catch (err) {
    console.log("err Adding Education into the  profile  ");
    console.log(err);
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/experience/" + id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed ", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// Delete education

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/education/" + id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed ", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// Delete account && profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure ? This can NOT be undone!")) {
    try {
      const res = await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been permanatly deleted "));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
