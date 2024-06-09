/**
 * Books API types
 */

// Book types
export type Book = {
	id: number;
	title: string;
	pages: number;
	published: number;
	authorId: number;
	author: Author;
};
export type NewBook = Omit<Book, "id">;
export type PartialBook = Partial<Book>;

// Author types
export type Author = {
	id: number;
	name: string;
	date_of_birth: string;
};
export type AuthorWithBooks = Author & { books: Book[] };
export type NewAuthor = Omit<Author, "id">;
export type PartialAuthor = Partial<Author>;
