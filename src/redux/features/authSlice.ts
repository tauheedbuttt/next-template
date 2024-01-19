import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") ? Cookies.get("token") : "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 30 });
    },
    removeAuthToken: (state) => {
      state.token = "";
      Cookies.remove("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthToken, removeAuthToken, setUser, removeUser } =
  authSlice.actions;
export default authSlice.reducer;
