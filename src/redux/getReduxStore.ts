import { useSelector } from "react-redux";
import { UserStateInterface, PropmtDataInterface } from "../models/dataModels";
import { RootState } from "./store";

export const getReduxStoreUser = (): UserStateInterface => {
  return useSelector((state: RootState) => state.user);
};

export const getReduxStorePrompt = (): PropmtDataInterface => {
  return useSelector((state: RootState) => state.propmtData);
};
