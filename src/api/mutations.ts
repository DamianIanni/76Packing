import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      success
      message
      code
      data
    }
  }
`;

export const INSERT_USER_STYLE = gql`
  mutation InsertUserStyle($userStyle: UserStyle!) {
    insertUserStyle(userStyle: $userStyle) {
      success
      message
      code
      data
    }
  }
`;

export const INSERT_USER = gql`
  mutation InsertUser($user: User!) {
    insertUser(user: $user) {
      success
      message
      code
      data
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: User!) {
    updateUser(user: $user) {
      success
      message
      code
      data
    }
  }
`;

export const INSERT_FAVPACKING = gql`
  mutation InsertFavPacking($favPacking: favPacking!) {
    insertFavPacking(favPacking: $favPacking) {
      success
      message
      code
      data
    }
  }
`;

export const UPDATE_FAVPACKING = gql`
  mutation UpdateFavPacking($favPacking: updateFavPackingData!) {
    updateFavPacking(favPacking: $favPacking) {
      success
      message
      code
      data
    }
  }
`;

export const INSERT_SAVEDLUGGAGE = gql`
  mutation InsertSavedLuggage($savedLuggage: SavedLuggage!) {
    insertSavedLuggage(savedLuggage: $savedLuggage) {
      success
      message
      code
      data
    }
  }
`;

export const UPDATE_SAVEDLUGGAGE = gql`
  mutation UpdateSavedLuggage($savedLuggage: SavedLuggage!) {
    updateSavedLuggage(savedLuggage: $savedLuggage) {
      success
      message
      code
      data
    }
  }
`;
