import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Book } from "../../services/BooksAPI.types";

interface BSBookTableProps {
	books: Book[];
}

// type SortKeys = "title" | "author" | "pages" | "published";
type SortKeys = keyof Book; // get a literal string union of all keys in Book type

const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {
	const [sortedData, setSortedData] = useState(books);
	const [sortKey, setSortKey] = useState<SortKeys | null>(null);
	const [sortAscending, setSortAscending] = useState(true);

	if (!books.length) {
		return <p>No books for you!</p>;
	}

	/**
	 * Set the data sort order
	 *
	 * @param key Key to sort by
	 */
	const orderBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key
		// 2. If we already sort by this key, reverse the order
		// 3. If we already sort by this key and in reverse order, don't sort
		// 4. Sort numeric data correctly

		if (sortKey !== key) {
			setSortKey(key);
			setSortAscending(true);
			setSortedData(sortDataByKey(key, true));
		} else if (sortAscending) {
			setSortAscending(false);
			setSortedData(sortDataByKey(key, false));
		} else {
			setSortKey(null);
			setSortAscending(true);
			setSortedData(sortDataByKey(null));
		}
	}

	/**
	 * Sort by key and return sorted data
	 *
	 * @param key Key to sort by
	 * @param ascending Order to sort by
	 * @returns The sorted data
	 */
	const sortDataByKey = (key: SortKeys | null, ascending = true) => {
		// if sortKey is null, return the original data
		if (!key) {
			return books;
		}

		return [...books].sort((a, b) => {
			if (typeof a[key] === "string" && typeof b[key] === "string") {
				return ascending
					? (a[key] as string).localeCompare(b[key] as string)
					: (b[key] as string).localeCompare(a[key] as string);
			} else if (typeof a[key] === "number" && typeof b[key] === "number") {
				return ascending
					? (a[key] as number) - (b[key] as number)
					: (b[key] as number) - (a[key] as number);
			}

			return 0;
		});
	}

	const sortIcon = (key: SortKeys) => {
		return sortKey === key
			? sortAscending
				? <span role="img" aria-label="Ascending">⬇️</span>
				: <span role="img" aria-label="Descending">⬆️</span>
			: null
	}

	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th colSpan={3}>Book Info</th>
					<th colSpan={2}>Author Info</th>
				</tr>
				<tr>
					<th onClick={() => orderBy("title")}>Title {sortIcon("title")}</th>
					<th onClick={() => orderBy("pages")}>Pages {sortIcon("pages")}</th>
					<th onClick={() => orderBy("published")}>Published {sortIcon("published")}</th>
					<th>Author</th>
					<th>Author Birthdate</th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td className="text-end">{book.pages}</td>
						<td className="text-end">{book.published}</td>
						<td>
							<Link to={"/authors/" + book.authorId}>
								{book.author.name}
							</Link>
						</td>
						<td className="text-end">{book.author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTable;
