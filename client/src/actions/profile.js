import axios from "axios";

import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

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
