import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, REDIRECT_TO } from "./types";

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
  (formData, edit = false) =>
  async (dispatch) => {
    //  history feha methode push to redirect us to the client side route
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created ", "success")
      );
      try {
        if (!edit) {
          dispatch({
            type: REDIRECT_TO,
            payload: true,
          });
        }
      } catch (error) {
        console.log(
          "cannot redirect you to dashboard probleme with function navigate "
        );
      }
    } catch (err) {
      console.log("err create profile !!!!!!!! ");
      console.log(err);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
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
