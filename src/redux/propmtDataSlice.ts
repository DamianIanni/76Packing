import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropmtDataInterface } from "../models/dataModels";
// interface PropmtDataInterface {
//   destination: string | null;
//   season: string[] | null;
//   activities: string | null;
//   luggage: string[] | null;
//   duration: number | null;
//   accommodation: string | null;
//   utilities: string[] | null;
// }

const initialState: PropmtDataInterface = {
  destination: null,
  season: null,
  activities: null,
  luggage: null,
  duration: null,
  accommodation: null,
  utilities: null,
};

const propmtDataSlice = createSlice({
  name: "propmtData",
  initialState,
  reducers: {
    setTravelData: (
      state,
      action: PayloadAction<{
        destination: string;
        duration: number;
        season: string[];
      }>
    ) => {
      state.destination = action.payload.destination;
      state.duration = action.payload.duration;
      state.season = action.payload.season;
    },
    setAccommodationData: (
      state,
      action: PayloadAction<{ accommodation: string; utilities: string[] }>
    ) => {
      state.accommodation = action.payload.accommodation;
      state.utilities = action.payload.utilities;
    },
    setActivitiesData: (
      state,
      action: PayloadAction<{ activities: string }>
    ) => {
      state.activities = action.payload.activities;
    },
    setLuggagePropmtData: (
      state,
      action: PayloadAction<{ luggage: string[] }>
    ) => {
      state.luggage = action.payload.luggage;
    },
    // setActivitiesData: (
    //   state,
    //   action: PayloadAction<{ activities: string }>
    // ) => {
    //   state.activities = action.payload.activities;
    // },
    clearPropmtData: (state) => {
      state.accommodation = null;
      state.activities = null;
      state.destination = null;
      state.duration = null;
      state.luggage = null;
      state.season = null;
      state.utilities = null;
    },
  },
});

export const {
  setTravelData,
  setAccommodationData,
  setActivitiesData,
  setLuggagePropmtData,
  clearPropmtData,
} = propmtDataSlice.actions;

export default propmtDataSlice.reducer;
