import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      success
      message
      code
      data
    }
  }
`;

export const GET_FAVPACKING = gql`
  query GetFavPacking($userId: String!) {
    getFavPacking(userId: $userId) {
      success
      message
      code
      data
    }
  }
`;

export const GET_SAVEDLUGGAGE = gql`
  query GetSavedLuggage($userId: String!) {
    getSavedLuggage(userId: $userId) {
      success
      message
      code
      data
    }
  }
`;

export const GET_PROPMT_LUGGAGE = gql`
  query PromptLuggage($prompt: PackingPromptInput!) {
    promptLuggage {
      success
      message
      code
      data
    }
  }
`;
