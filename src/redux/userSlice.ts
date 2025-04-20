import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  photoUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.photoUrl = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
