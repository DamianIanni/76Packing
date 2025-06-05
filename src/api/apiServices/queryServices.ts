import { client } from "../client";
import {
  GET_USER,
  GET_FAVPACKING,
  GET_PROPMT_LUGGAGE,
  GET_SAVEDLUGGAGE,
  GET_USERID,
  GET_ALL_USER_DATA,
} from "../queries";
import { handleGraphQLError } from "../../utils/errorHandler/errorHandler";
import { errorResponse } from "../../utils/errorHandler/errorResponse";

export interface PackingPromptInput {
  destination: string;
  duration: number;
  activities?: string;
  luggageItems: string[];
  weatherSensitivity?: string;
  favoriteClothing?: string;
  accommodationType?: string;
  utilities?: string[];
  gender?: string;
  height?: string;
  nationality?: string;
  // age: number;
  dressStyle?: string;
}

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
    handleGraphQLError(error, "retreiving your data");
    return errorResponse(error);
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
    handleGraphQLError(error, "retreiving your data");
    return errorResponse(error);
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
    handleGraphQLError(error, "retreiving your data");
    return errorResponse(error);
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
    handleGraphQLError(error, "retreiving your luggage");
    return errorResponse(error);
  }
};

export const getPromptLuggageFromServer = async (
  prompt: PackingPromptInput
) => {
  console.log("PACKING PROMPT", prompt);
  try {
    const { data } = await client.query({
      query: GET_PROPMT_LUGGAGE,
      variables: { prompt },
      fetchPolicy: "network-only",
    });

    console.log("PACKING PROMPT DAtA RETURN", data);
    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "asking the AI");
    return errorResponse(error);
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
    handleGraphQLError(error, "retreiving your saved luggage");
    return errorResponse(error);
  }
};
