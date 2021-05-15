import { v4 as uuidv4 } from "uuid";

export const createWatchList = (userId, name, description) => {
  const watchListId = uuidv4();
  const query = {
    query: `mutation MyMutation {
        createWatchList(
          input: {watchListId: "${watchListId}", userId: "${userId}", description: "${description}", name: "${name}" }
        ) {
            name
        }
      }`,
  };
  return query;
};

export const listWatchLists = (userId) => {
    const query = {
      query: `query listWatchLists {
        listWatchLists(userId: "${userId}") {
          items {
            name
            description
            watchListId
            createdAt
          }
        }
      }`,
    };
    return query;
  };
  

