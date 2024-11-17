import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login";

const store = configureStore({
    reducer: {
        login: loginSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export const loginActions = loginSlice.actions;
