// src/utils/errorHandler.ts
import { Alert } from "react-native";

export const handleGraphQLError = (error: any, customMessage: string) => {
  console.error("GraphQL Error:", error);
  const contextMessage: string = "Something went wrong";
  // Si querés podés parsear el error más finamente acá
  const message =
    error?.message ||
    error?.networkError?.message ||
    error?.graphQLErrors?.[0]?.message ||
    "Unexpected error";

  Alert.alert(`${contextMessage}`, `${customMessage}, try again later.`);
};
