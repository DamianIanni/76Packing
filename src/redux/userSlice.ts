import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface } from "../models/dataModels";
import { UserInterface, SavedLuggage } from "../models/dataModels";
import { FavPackingInterface } from "../models/dataModels";

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
  // favClothes: null,
  favPacking: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFavPacking: (state, action: PayloadAction<FavPackingInterface>) => {
      // console.log("QuALUMPUR", action.payload);
      state.favPacking = [...(state.favPacking ?? []), action.payload];
    },
    setUserAfterLogin: (
      state,
      action: PayloadAction<{
        email: string;
        photoUrl: string | null;
        givenName: string | null;
        familyName: string | null;
      }>
    ) => {
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.name = action.payload.givenName;
      state.surname = action.payload.familyName;
    },
    setAllData: (
      state,
      action: PayloadAction<{
        user: {
          Email: string;
          Name: string;
          Surname: string;
          DateOfBirth: string;
          Gender: string;
          userId: string;
        };
        savedLuggage: SavedLuggage;
        favPacking: FavPackingInterface[];
        userStyle: {
          brands: string | null;
          style: string | null;
        };
        userBrands?: string;
        photoUrl: string;
      }>
    ) => {
      console.log("ACTION PAYLOAD", action.payload);

      state.email = action.payload.user.Email;
      state.name = action.payload.user.Name;
      state.surname = action.payload.user.Surname;
      state.dateOfBirth = action.payload.user.DateOfBirth;
      state.gender = action.payload.user.Gender;
      // state.height = action.payload.height;
      state.userId = action.payload.user.userId;
      state.style = action.payload.userStyle?.style ?? null;
      state.brands = action.payload.userStyle?.brands ?? null;
      state.savedLuggage = action.payload.savedLuggage ?? null;
      // state.favClothes = action.payload.favClothes;
      state.favPacking = action.payload.favPacking;
      state.photoUrl = action.payload.photoUrl;
    },
    setUserProfileData: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        surname: string;
        dateOfBirth?: string | null;
        gender?: string | null;
        height?: number | null;
      }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.dateOfBirth = action.payload.dateOfBirth ?? null;
      state.gender = action.payload.gender ?? null;
      state.height = action.payload.height ?? null;
      // state.userId = action.payload.userId;
    },
    setUserStyleData: (
      state,
      action: PayloadAction<{ style: string; brands: string }>
    ) => {
      state.style = action.payload.style;
      state.brands = action.payload.brands;
    },
    // setUserLuggageData: (
    //   state,
    //   action: PayloadAction<{ style: string; brands: string }>
    // ) => {
    //   state.style = action.payload.style;
    //   state.brands = action.payload.brands;
    // },
    setSavedLuggageData: (
      state,
      action: PayloadAction<{
        savedLuggage: {
          luggage1: string;
          luggage2: string;
          luggage3: string;
          luggage4: string;
        };
      }>
    ) => {
      state.savedLuggage = action.payload.savedLuggage;
    },
    setUserProfilePhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
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
      // state.favClothes = null;
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
  setAllData,
  setUserProfilePhotoUrl,
  setFavPacking,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
