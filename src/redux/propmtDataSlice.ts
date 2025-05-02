import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface } from "../models/dataModels";
import { UserInterface } from "../models/dataModels";

interface PropmtDataInterface {
  destination: string | null;
  season: string[] | null;
  activities: string | null;
  luggage: string | null;
  duration: number | null;
  accommodation: string | null;
}

const initialState: PropmtDataInterface = {
  destination: null,
  season: null,
  activities: null,
  luggage: null,
  duration: null,
  accommodation: null,
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
        activities: string;
      }>
    ) => {
      state.destination = action.payload.destination;
      state.duration = action.payload.duration;
      state.season = action.payload.season;
      state.activities = action.payload.activities;
    },
    setAccommodationData: (
      state,
      action: PayloadAction<{ accommodation: string }>
    ) => {
      state.accommodation = action.payload.accommodation;
    },
    clearPropmtData: (state) => {
      state.accommodation = null;
      state.activities = null;
      state.destination = null;
      state.duration = null;
      state.luggage = null;
      state.season = null;
    },
  },
});

export const { setTravelData, setAccommodationData, clearPropmtData } =
  propmtDataSlice.actions;

export default propmtDataSlice.reducer;
