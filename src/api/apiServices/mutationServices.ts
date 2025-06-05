import { client } from "../client";
import {
  UserInterface,
  FavPackingInterface,
  SavedLuggage,
} from "../../models/dataModels";
import {
  INSERT_USER,
  INSERT_FAVPACKING,
  INSERT_SAVEDLUGGAGE,
  UPDATE_FAVPACKING,
  UPDATE_SAVEDLUGGAGE,
  UPDATE_USER,
  DELETE_USER,
  INSERT_USER_STYLE,
  UPDATE_USER_STYLE,
} from "../mutations";

import { errorResponse } from "../../utils/errorHandler/errorResponse";
import { handleGraphQLError } from "../../utils/errorHandler/errorHandler";
//// USER
export const insertUserToServer = async (user: {
  Email: string;
  Surname: string;
  Name: string;
  //   date_of_birth: string;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: INSERT_USER,
      variables: { user },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "creating the user");
    return errorResponse(error);
  }
};

export const updateUserToServer = async (user: {
  Name: string;
  Surname: string;
  userId: string;
  Email: string;
  DateOfBirth: string | null;
  Gender: string | null;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables: { user },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "updating the user");
    return errorResponse(error);
  }
};

export const deleteUserToServer = async (userId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_USER,
      variables: { userId },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "deleting the user");
    return errorResponse(error);
  }
};

export const insertUserStyle = async (userStyle: {
  userId: string;
  style: string;
  brands: string;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: INSERT_USER_STYLE,
      variables: {
        userStyle,
      },
      fetchPolicy: "network-only",
    });
    console.log("DATA FROM SERVER", data);
    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "saving user style");
    return errorResponse(error);
  }
};

export const updateUserStyle = async (userStyle: {
  userId: string;
  style: string;
  brands: string;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_STYLE,
      variables: {
        userStyle,
      },
      fetchPolicy: "network-only",
    });
    console.log("DATA FROM SERVER UPDATE STYLE", data);
    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "updating user style");
    return errorResponse(error);
  }
};

//// PACKING
export const insertFavPackingToServer = async (
  favPacking: FavPackingInterface
) => {
  // console.log("A VER QUE LLEGA", favPacking);

  try {
    const { data } = await client.mutate({
      mutation: INSERT_FAVPACKING,
      variables: { favPacking },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "saving your luggage");
    return errorResponse(error);
  }
};

export const updateFavPackingToServer = async (favPacking: {
  packing_type: number;
  userId: string;
  Luggage_1: string;
  Luggage_2?: string | null;
  Luggage_3?: string | null;
  Luggage_4?: string | null;
  id: number;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_FAVPACKING,
      variables: { favPacking },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "updating your luggage");
    return errorResponse(error);
  }
};

//// LUGGAGE
export const insertSavedLuggageToServer = async (
  savedLuggage: SavedLuggage
) => {
  try {
    const { data } = await client.mutate({
      mutation: INSERT_SAVEDLUGGAGE,
      variables: { savedLuggage },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "saving your fav luggage");
    return errorResponse(error);
  }
};

export const updateSavedLuggageToServer = async (
  savedLuggage: SavedLuggage
) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_SAVEDLUGGAGE,
      variables: { savedLuggage },
      fetchPolicy: "network-only",
    });
    // const parseData = JSON.parse(data.getUser.data);
    console.log("DATA FROM SERVER", data);

    return data;
  } catch (error) {
    console.log("EL ERROR", error);
    handleGraphQLError(error, "updating your fav luggage");
    return errorResponse(error);
  }
};
