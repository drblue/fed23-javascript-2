/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from "axios";
import { HN_SearchResponse } from "./HackerNewsAPI.types";

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://hn.algolia.com/api/v1",
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to GET
 */
const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);
	return res.data;
}

/**
 * Search Hacker News stories
 *
 * @param query Query to search for
 * @param page Page of search result to get
 */
export const search = (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search?query=${query}&tags=story&page=${page}`);
}

/**
 * Search Hacker News stories by date
 *
 * @param query Query to search for
 * @param page Page of search result to get
 */
export const searchByDate = (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`);
}

/*
// Just an example to demo sending a type argument to a generic function
// Not anything that exist in the API
export const getStoryById = (story_id: number) => {
	return get<HN_SearchHit>(`/stories/${story_id}`);
}
*/
