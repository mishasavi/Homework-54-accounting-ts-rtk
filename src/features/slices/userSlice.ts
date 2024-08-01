import { createSlice } from "@reduxjs/toolkit"
import { logInFetch, registerFetch, updatePasswordFetch, updateUserFetch } from "../actions/accountAction"
import type { User } from "../../utils/interfaces"

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {} as User, //TODO * указать два типа данных
    status: "",
    currentToken: ""

  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerFetch.pending, (state) => {
        state.status = "Pending..."
      })
      .addCase(registerFetch.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = ""
      })
      .addCase(registerFetch.rejected, (state, action) => {
        state.status = "Error! " + action.error.message
      })
      .addCase(logInFetch.pending, (state) => {
        state.status = "Pending..."
      })
      .addCase(logInFetch.fulfilled, (state, action) => {
        state.status = ""
        state.data = action.payload
      })
      .addCase(logInFetch.rejected, (state, action) => {
        state.status = "Error! " + action.error.message
      })
      .addCase(updatePasswordFetch.pending, (state) => {
        state.status = "Updating password...";
      })
      .addCase(updatePasswordFetch.fulfilled, (state) => {
        state.status = "Password updated successfully";
      })
      .addCase(updatePasswordFetch.rejected, (state, action) => {
        state.status = "Error updating password: " + action.error.message;
      })
      .addCase(updateUserFetch.pending, (state) => {
        state.status = "Updating user data...";
      })
      .addCase(updateUserFetch.fulfilled, (state, action) => {
        state.status = "User data updated successfully";
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(updateUserFetch.rejected, (state, action) => {
        state.status = "Error updating user data: " + action.error.message;
      })
    ;
  }
})

export default UserSlice