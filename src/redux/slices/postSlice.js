import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  post: {
    title: '',
    location: '',
    picketer: '',
    description: '',
  },
  posts: [],
  loading: true,
  error: null,
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    getPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePost: (state, action) => {
      state.post[action.payload.name] = action.payload.value;
    },
    resetPost: (state) => {
      state.post = initialState.post;
    },
  },
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
  updatePost,
  resetPost,
} = post.actions;

export const getPosts = (query) => async (dispatch) => {
  try {
    const res = await api.get(query ? `/posts/${query}` : '/posts');
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(
      getPostsFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(getPostStart());
    const res = await api.get(`/posts/${id}`);
    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(
      getPostFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default post.reducer;
