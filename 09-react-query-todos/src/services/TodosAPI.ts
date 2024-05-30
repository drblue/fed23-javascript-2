/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { NewTodo, Todo } from "./TodosAPI.types";

const BASE_URL = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";
const FAKE_DELAY = 1500;

// Create a new axios instance
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to HTTP GET
 * @returns {Promise<T>}
 */
const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);

	// Fake a slow API
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY));

	return res.data;
}

/**
 * Get all todos
 */
export const getTodos = () => {
	return get<Todo[]>("/todos");
}

/**
 * Get a single todo
 */
export const getTodo = (todo_id: number) => {
	return get<Todo>("/todos/" + todo_id);
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: NewTodo) => {
	const res = await instance.post<Todo>("/todos", todo);
	return res.data;
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todo_id: number, data: Partial<NewTodo>) => {
	const res = await instance.patch<Todo>(`/todos/${todo_id}`, data);
	return res.data;
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todo_id: number) => {
	await instance.delete(`/todos/${todo_id}`);
}
