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
 * Search Hacker News stories
 *
 * @param query Query to search for
 * @param page Page of search result to get
 */
export const search = async (query: string, page = 0) => {
	const res = await instance.get<HN_SearchResponse>(`/search?query=${query}&tags=story&page=${page}`);
	return res.data;
}

/**
 * Search Hacker News stories by date
 *
 * @param query Query to search for
 * @param page Page of search result to get
 */
export const searchByDate = async (query: string, page = 0) => {
	const res = await instance.get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`);
	return res.data;
}
