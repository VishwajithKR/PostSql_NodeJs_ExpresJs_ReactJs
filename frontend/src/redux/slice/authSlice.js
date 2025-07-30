import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(sessionStorage.getItem("authUser"));

const initialState = {
  fullName: session?.fullName || "",
  token: session?.token || "",
  email: session?.email || "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      const updates = action.payload;
      console.log(updates,"updates")
      if (updates) {
        const newState = {
          ...state,
          ...updates,
        };
        sessionStorage.setItem("authUser", JSON.stringify(newState));
        return newState;
      }
      return state;
    },

    setLogout: () => {
      sessionStorage.clear();
      return {
        fullName: "",
        token: "",
        email: "",
      };
    },
  },
});

export const { setUserState, setLogout } = authSlice.actions;
export default authSlice.reducer;
