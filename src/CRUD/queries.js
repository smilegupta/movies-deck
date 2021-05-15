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
  

  export const createMovie = (userId, movieTitle, backdrop_path, id, poster_path, release_date, watchListId) => {
    const query = {
      query: `mutation MyMutation {
        createMovies(
            input: {watchListId: "${watchListId}", userId: "${userId}", title: "${movieTitle}", releaseDate: "${release_date}", posterPath: "${poster_path}", movieId:"${id}", backdropPath: "${backdrop_path}" }
          ) {
            movieId
          }
        }`,
    };
    return query;
  };