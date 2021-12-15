import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR ,UPDATE_PROFILE} from "./types";

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
      console.log("begin formData edit");

      console.log(formData);
      console.log("end formData edit");

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
