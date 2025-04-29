import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface } from "../models/dataModels";
import { UserInterface } from "../models/dataModels";

const initialState: UserStateInterface = {
  googleIdToken: null,
  userId: null,
  name: null,
  surname: null,
  email: null,
  photoUrl: null,
  dateOfBirth: null,
  gender: null,
  height: null,
  style: null,
  favClothes: null,
  favPacking: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAfterLogin: (
      state,
      action: PayloadAction<{ email: string; photoUrl: string | null }>
    ) => {
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
    },
    setUserProfileData: (state, action: PayloadAction<UserInterface>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.height = action.payload.height;
      state.userId = action.payload.userId;
    },
    // clearUser: (state) => {
    //   state.id = null;
    //   state.name = null;
    //   state.email = null;
    //   state.photoUrl = null;
    // },
  },
});

export const { setUserAfterLogin, setUserProfileData } = userSlice.actions;

export default userSlice.reducer;
