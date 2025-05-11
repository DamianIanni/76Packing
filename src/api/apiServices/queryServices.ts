import { client } from "../client";
import {
  GET_USER,
  GET_FAVPACKING,
  GET_PROPMT_LUGGAGE,
  GET_SAVEDLUGGAGE,
  GET_USERID,
  GET_ALL_USER_DATA,
} from "../queries";

export const getUserFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    console.log("USER DATA FROM SERVER", data.getUser.data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

export const getUserIdFromServer = async (email: string) => {
  try {
    const { data } = await client.query({
      query: GET_USERID,
      variables: { email },
      fetchPolicy: "network-only",
    });
    console.log("USER DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

export const getAllUserDataFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_ALL_USER_DATA,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    console.log("USER DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

export const getFavPackingFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_FAVPACKING,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

export const getPromptLuggageFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_PROPMT_LUGGAGE,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

export const getSavedLuggageFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_SAVEDLUGGAGE,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};
