import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getPostsSuccess, getPostsFailure } = post.actions;

export const getPosts = (query) => async (dispatch) => {
  try {
    const res = await api.get(query ? `/posts${query}` : '/posts');
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

export default post.reducer;
