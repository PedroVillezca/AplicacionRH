/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($blueTag: ID!) {
    getUser(blueTag: $blueTag) {
      blueTag
      name
      birthDay
      birthMonth
      birthYear
      email
      receiveNotifications
      sendNotifications
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
        birthDay
        birthMonth
        birthYear
        email
        receiveNotifications
        sendNotifications
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        blueTag
        name
        birthDay
        birthMonth
        birthYear
        email
        receiveNotifications
        sendNotifications
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
