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
  brands: null,
  savedLuggage: null,
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
    setUserStyleData: (
      state,
      action: PayloadAction<{ style: string; brands: string }>
    ) => {
      state.style = action.payload.style;
      state.brands = action.payload.brands;
    },
    setUserLuggageData: (
      state,
      action: PayloadAction<{ style: string; brands: string }>
    ) => {
      state.style = action.payload.style;
      state.brands = action.payload.brands;
    },
    setSavedLuggageData: (
      state,
      action: PayloadAction<{ savedLuggage: string }>
    ) => {
      state.savedLuggage = action.payload.savedLuggage;
    },
    clearUser: (state) => {
      state.userId = null;
      state.name = null;
      state.surname = null;
      state.email = null;
      state.photoUrl = null;
      state.dateOfBirth = null;
      state.gender = null;
      state.height = null;
      state.style = null;
      state.brands = null;
      state.favClothes = null;
      state.savedLuggage = null;
      state.favPacking = null;
    },
  },
});

export const {
  setUserAfterLogin,
  setUserProfileData,
  setUserStyleData,
  setSavedLuggageData,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
