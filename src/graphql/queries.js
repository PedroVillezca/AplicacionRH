/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($blueTag: ID!) {
    getUser(blueTag: $blueTag) {
      blueTag
      firstName
      lastName
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
        firstName
        lastName
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
export const getNotification = /* GraphQL */ `
  query GetNotification($blueTag: ID!, $date: AWSDate!, $message: String!) {
    getNotification(blueTag: $blueTag, date: $date, message: $message) {
      blueTag
      date
      message
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $blueTag: ID
    $dateMessage: ModelNotificationPrimaryCompositeKeyConditionInput
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNotifications(
      blueTag: $blueTag
      dateMessage: $dateMessage
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        blueTag
        date
        message
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
        firstName
        lastName
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
