import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Author } from "../../services/BooksAPI.types";

interface BSAuthorTableProps {
	authors: Author[];
}

// type SortKeys = "name" | "date_of_birth";
type SortKeys = keyof Author; // get a literal string union of all keys in Author type

const BSAuthorTable: React.FC<BSAuthorTableProps> = ({ authors }) => {
	const [sortedData, setSortedData] = useState(authors);
	const [sortKey, setSortKey] = useState<SortKeys | null>(null);
	const [sortAscending, setSortAscending] = useState(true);

	if (!authors.length) {
		return <p>No authors for you!</p>;
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
			return authors;
		}

		return [...authors].sort((a, b) => {
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
					<th onClick={() => orderBy("name")}>Name {sortIcon("name")}</th>
					<th onClick={() => orderBy("date_of_birth")}>Date of birth {sortIcon("date_of_birth")}</th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(author => (
					<tr key={author.id}>
						<td>
							<Link to={"/authors/" + author.id}>
								{author.name}
							</Link>
						</td>
						<td className="text-end">{author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSAuthorTable;
