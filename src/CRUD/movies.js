import rawAxios from "axios"
import {api} from './axios.config'
const API_URL = api.apiUl;

const apiKey = "b2e32407b97c762f8c7c78bf29bf3ec1"
const GET_ALL_DATA = '/discover/movie'
const GENER_LIST = "/genre/movie/list"
const SEARCH_MOVIES = "/search/movie"

export function getAllMovies(pageCount, pattern) {
    let queryParams =`?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageCount}`
    if(pattern){
        queryParams =`?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageCount}&with_genres=${pattern}`
    }
    return rawAxios.get(API_URL + GET_ALL_DATA + queryParams );
}


export function getGenerList(){
    const queryParams =`?api_key=${apiKey}&language=en-US`
    return rawAxios.get(API_URL + GENER_LIST + queryParams );
}

export function searchMovies(searchKeyWord){
    const queryParams = `?api_key=${apiKey}&query=${searchKeyWord}&language=en-US&include_adult=false`
    return rawAxios.get(API_URL + SEARCH_MOVIES + queryParams );
}