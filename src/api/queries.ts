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

export const GET_USERID = gql`
  query GetUserID($email: String!) {
    getUserId(email: $email) {
      success
      message
      code
      data
    }
  }
`;

export const GET_ALL_USER_DATA = gql`
  query GetAllUserData($userId: String!) {
    getAllUserData(userId: $userId) {
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
    promptLuggage(prompt: $prompt) {
      success
      message
      code
      data
    }
  }
`;
