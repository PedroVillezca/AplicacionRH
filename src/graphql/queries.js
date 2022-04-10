/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($blueTag: ID!) {
    getUser(blueTag: $blueTag) {
      blueTag
      name
      birthday
      devices
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
        devices
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
