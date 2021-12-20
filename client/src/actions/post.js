import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    // console.log("wa3333!!!!-------------------");
    // console.log(res.data.posts);

    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put("/api/posts/like/" + postId);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put("/api/posts/unlike/" + postId);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Delete post
export const deletePost = (postId) => async (dispatch) => {
  if (window.confirm("Are you sure ? You wanna delete this post ?")) {
    try {
      const res = await axios.delete("/api/posts/" + postId);

      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts/" + id);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "/api/posts/comment/" + postId,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added to the post", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete("/api/posts/comment/" + postId + "/" + commentId);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed from the post", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // a voir response bech ta3ref l payload chnoi : status 500 res server error arja3 lel code 5ir emte3 node
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
