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
} from "../mutations";

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
    return data;
  } catch (error) {
    console.log("EL ERROR", error);
  }
};

//// PACKING
export const insertFavPackingToServer = async (
  favPacking: FavPackingInterface
) => {
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
  }
};

export const updateFavPackingToServer = async (favPacking: {
  userId: string;
  packing_type: number;
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
  }
};
