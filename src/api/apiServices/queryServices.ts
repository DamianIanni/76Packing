import { client } from "../client";
import {
  GET_USER,
  GET_FAVPACKING,
  GET_PROPMT_LUGGAGE,
  GET_SAVEDLUGGAGE,
} from "../queries";

export const getUserFromServer = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("USER DATA FROM SERVER", data.getUser.data);

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
    // const parseData = JSON.parse(data.getUser.data);
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
    // const parseData = JSON.parse(data.getUser.data);
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
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};
