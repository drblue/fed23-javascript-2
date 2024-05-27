/**
 * ICanHazDadJoke API
 *
 * <https://icanhazdadjoke.com/api>
 */

import axios from "axios";
import { DadJokeResponse } from "./ICanHazDadJokeApi.types";

const FAKE_DELAY = 2500;

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://icanhazdadjoke.com",
	timeout: 10000,
	headers: {
		"Accept": "application/json",
	},
});

/**
 * Eexecute a HTTP GET request to an endpoint
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
 * Get a random dad joke
 *
 */
export const getRandomDadJoke = () => {
	return get<DadJokeResponse>("/");
}
