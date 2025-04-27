import { useSelector } from "react-redux";
import { UserStateInterface } from "../models/dataModels";
import { RootState } from "./store";

export const getReduxStore = (): UserStateInterface => {
  return useSelector((state: RootState) => state.user);
};
