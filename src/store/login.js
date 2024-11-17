import { createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../utils/axiosRequest";
import { loginActions } from ".";

const initialState = {
    name: "",
    email: "",
    password: "",
    snackbarMessage: "",
    snackbarOpen: false,
    username: "",
    useremail: "",
    userId: ""
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        resetLoginValues(state, action) {
            state.name = "";
            state.email = "";
            state.password = "";
        },
        setName(state, action) {
            state.name = action.payload.name;
        },
        setEmail(state, action) {
            state.email = action.payload.email;
        },
        setPassword(state, action) {
            state.password = action.payload.password;
        },
        setSnackbarMessage(state, action) {
            state.snackbarMessage = action.payload.snackbarMessage;
        },
        setSnackbar(state, action) {
            state.snackbarOpen = action.payload.snackbarOpen;
        },
        setLoggedinUser(state, action) {
            state.username = action.payload.name;
            state.useremail = action.payload.email;
            state.userId = action.payload.id;
        }
    }
});

export default loginSlice;

export const loginInApp = (navigate) => {
    return async (dispatch, getState) => {
        try {
            const { login } = getState();
            const response = await axiosRequest('/login', 'POST', false, {
                "email": login.email,
                "password": login.password
            });
            let { data } = response.data;
            localStorage.setItem('token', data?.token || null);
            dispatch(loginActions.setLoggedinUser(data.user));
            navigate('/dashboard');
        }
        catch (error) {
            console.log(error.response);
            const text = error?.response?.data?.message?.[0] || 'Something went wrong !';
            if (error?.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            dispatch(loginActions.setSnackbar({ snackbarOpen: true }));
            dispatch(loginActions.setSnackbarMessage({ snackbarMessage: text }));
        }
    }
}

export const registerInApp = (navigate) => {
    return async (dispatch, getState) => {
        try {
            const { login } = getState();
            const response = await axiosRequest('/user', 'POST', false, {
                "name": login.name,
                "email": login.email,
                "password": login.password
            });
            let { data } = response.data;
            localStorage.setItem('token', data?.token || null);
            dispatch(loginActions.setLoggedinUser(data.user));
            navigate('/dashboard');
        }
        catch (error) {
            console.log(error.response);
            const text = error?.response?.data?.message?.[0] || 'Something went wrong !';
            if (error?.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            dispatch(loginActions.setSnackbar({ snackbarOpen: true }));
            dispatch(loginActions.setSnackbarMessage({ snackbarMessage: text }));
        }
    }
}