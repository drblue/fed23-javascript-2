/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import {
	Book,
	NewBook,
	PartialBook,
	Author,
	AuthorWithBooks,
	NewAuthor,
	PartialAuthor,
} from "./BooksAPI.types";

const BASE_URL = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";

// Create a new axios instance
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param endpoint Endpoint to HTTP GET
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint);
	return response.data;
};

/**
 * Execute a HTTP POST request to an endpoint.
 *
 * @param endpoint Endpoint to HTTP POST
 * @param data Data to POST
 */
const post = async <Payload, Response>(endpoint: string, data: Payload) => {
	const response = await instance.post<Response>(endpoint, data);
	return response.data;
};

/**
 * Execute a HTTP PATCH request to an endpoint.
 *
 * @param endpoint Endpoint to HTTP PATCH
 * @param data Data to PATCH
 */
const patch = async <Payload, Response>(endpoint: string, data: Payload) => {
	const response = await instance.patch<Response>(endpoint, data);
	return response.data;
};

/**
 * Execute a HTTP DELETE request to an endpoint.
 *
 * @param endpoint Endpoint to HTTP DELETE
 */
const del = async (endpoint: string) => {
	const response = await instance.delete(endpoint);
	return response.data;
};

/**********************************
 *
 * Books
 *
 **********************************/

/**
 * Get all books (with author)
 */
export const getBooks = () => {
	return get<Book[]>("/books?_expand=author");
};

/**
 * Get a single book (with author)
 *
 * @param book_id Book ID to get
 */
export const getBook = (book_id: number) => {
	return get<Book>(`/books/${book_id}?_expand=author`);
};

/**
 * Create a new book
 *
 * @param data Object with properties and values for the new book
 */
export const createBook = async (book: NewBook) => {
	return post<NewBook, Book>("/books", book);
};

/**
 * Update a book
 *
 * @param book_id Book to update
 * @param data Data to update book with
 */
export const updateBook = async (book_id: number, data: PartialBook) => {
	return patch<PartialBook, Book>("/books/" + book_id, data);
};

/**
 * Delete a book
 *
 * @param book_id Book to delete
 */
export const deleteBook = async (book_id: number) => {
	return del("/books/" + book_id);
};

/**********************************
 *
 * Authors
 *
 **********************************/

/**
 * Get all authors
 */
export const getAuthors = () => {
	return get<Author[]>("/authors");
};

/**
 * Get a single author (with their books)
 *
 * @param author_id Author ID to get
 */
export const getAuthor = (author_id: number) => {
	return get<AuthorWithBooks>(`/authors/${author_id}?_embed=books`);
};

/**
 * Create a new author
 *
 * @param data Object with properties and values for the new author
 */
export const createAuthor = async (author: NewAuthor) => {
	return post<NewAuthor, Author>("/authors", author);
};

/**
 * Update an author
 *
 * @param author_id Author to update
 * @param data Data to update author with
 */
export const updateAuthor = async (author_id: number, data: PartialAuthor) => {
	return patch<PartialAuthor, Author>("/authors/" + author_id, data);
};

/**
 * Delete an author
 *
 * @param author_id Author to delete
 */
export const deleteAuthor = async (author_id: number) => {
	return del("/authors/" + author_id);
};
