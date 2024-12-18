import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/UserConstants";
  import axios from "axios";

  
  const apiUrl = process.env.REACT_APP_API_URL;
  
  // Login
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `${apiUrl}/api/v1/login`,
        { email, password },
        config, {
          withCredentials: true
        }
      );
      
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      console.error('Login Error in Action Creator:', error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  // Register
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`${apiUrl}/api/v1/register`, userData, config, {
        withCredentials: true
      });
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`${apiUrl}/api/v1/me`, {
        withCredentials: true
      });
      // console.log("data", data);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
  
  // Logout User
  export const logout = () => async (dispatch) => {
    try {
      await axios.get(`${apiUrl}/api/v1/logout`, {
        withCredentials: true
      });
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update Profile
  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`${apiUrl}/api/v1/me/update`, userData, config, {
        withCredentials: true
      });
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Password
  export const updatePassword = (passwordData) => async (dispatch) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
  
      const { data } = await axios.put(`${apiUrl}/api/v1/password/update`, passwordData, config, {
        withCredentials: true
      });
  
      if (data.success) {
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
      } else {
        throw new Error(data.message); // Throw an error if success is false
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      throw error; // Re-throw the error so it can be caught in the component
    }
  };
  
  // Forgot Password
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`${apiUrl}/api/v1/password/forgot`, email, config, {
        withCredentials: true
      });
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Reset Password
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${apiUrl}/api/v1/password/reset/${token}`,
        passwords,
        config, {
          withCredentials: true
        }
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // get All Users
  export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`${apiUrl}/api/v1/admin/users`, {
        withCredentials: true
      });
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };
  
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`${apiUrl}/api/v1/admin/user/${id}`, {
        withCredentials: true
      });
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${apiUrl}/api/v1/admin/user/${id}`,
        userData,
        config,{
          withCredentials: true
        }
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`${apiUrl}/api/v1/admin/user/${id}`, {
        withCredentials: true
      });
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };