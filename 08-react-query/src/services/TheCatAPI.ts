/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */

import axios from "axios";
import { RandomCat } from "./TheCatAPI.types";

const API_KEY = import.meta.env.VITE_CATAPI_KEY;
const FAKE_DELAY = 1500;

// Create a new Axios instance
const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1/",
	timeout: 10000,
	headers: {
		"x-api-key": API_KEY,
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to HTTP GET
 */
const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);

	// Fake slow API if FAKE_DELAY is truthy
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY));

	return res.data;
}

/**
 * Get a random cat image
 *
 * @param breed _(optional)_ Breed ID to get
 */
export const getRandomCatImage = async (breed = "") => {
	const data = await get<RandomCat[]>("images/search?breed_ids=" + breed);
	return data[0];
}
