import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  report: {
    title: '',
    picketer: '',
    text: '',
    subject: '',
    to: '',
  },
  reports: [],
  loading: true,
  error: null,
};

const report = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getReportsSuccess: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
    },
    getReportsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getReportSuccess: (state, action) => {
      state.report = action.payload;
      state.loading = false;
    },
    updateReport: (state, action) => {
      state.report[action.payload.name] = action.payload.value;
    },
    resetReport: (state) => {
      state.report = initialState.report;
    },
  },
});

export const {
  getReportsStart,
  getReportsSuccess,
  getReportsFailure,
  getReportSuccess,
  updateReport,
  resetReport,
} = report.actions;

export const getReports = () => async (dispatch) => {
  try {
    const res = await api.get('/report');
    dispatch(getReportsSuccess(res.data));
  } catch (err) {
    dispatch(
      getReportsFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const getReport = (id) => async (dispatch) => {
  try {
    dispatch(getReportsStart());
    const res = await api.get(`/report/${id}`);
    dispatch(getReportSuccess(res.data));
  } catch (err) {
    dispatch(
      getReportsFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default report.reducer;
