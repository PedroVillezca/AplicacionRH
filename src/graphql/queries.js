/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      blueTag
      name
      birthday
      email
      createdAt
      updatedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($blueTag: ID!) {
    getUser(blueTag: $blueTag) {
      blueTag
      name
      birthday
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $blueTag: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      blueTag: $blueTag
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        blueTag
        name
        birthday
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
