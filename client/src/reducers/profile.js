import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  REDIRECT_TO,
} from "../actions/types";
// visa express
const initialState = {
  profile: null, //current profile or searched profile
  profiles: [], // all profile
  repos: [],
  loading: true, // request en cours d envoie or not
  error: {},
  redirect_dash: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case REDIRECT_TO:
      return {
        ...state,
        redirect_dash: payload,
      };
    default:
      return state;
  }
}
