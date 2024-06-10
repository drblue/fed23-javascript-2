import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Book } from "../services/BooksAPI.types";

interface BSBookTableProps {
	books: Book[];
}

// type SortKeys = "title" | "author" | "pages" | "published";
type SortKeys = keyof Book; // get a literal string union of all keys in Book type

const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {
	const [sortKey, setSortKey] = useState<SortKeys | null>(null);
	const [sortAscending, setSortAscending] = useState(true);

	if (!books.length) {
		return <p>No books for you!</p>;
	}

	/**
	 * Sort data by key
	 *
	 * @param key Key to sort by
	 */
	const sortBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key
		// 2. If we already sort by this key, reverse the order
		// 3. If we already sort by this key and in reverse order, don't sort
		// 4. Sort numeric data correctly
	}

	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th onClick={() => sortBy("title")}>Title</th>
					<th>Author</th>
					<th onClick={() => sortBy("pages")}>Pages</th>
					<th onClick={() => sortBy("published")}>Published</th>
				</tr>
			</thead>

			<tbody>
				{books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>
							<Link to={"/authors/" + book.authorId}>
								{book.author.name}
							</Link>
						</td>
						<td className="text-end">{book.pages}</td>
						<td className="text-end">{book.published}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTable;
