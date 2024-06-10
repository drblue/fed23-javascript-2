import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Book } from "../services/BooksAPI.types";

interface BSBookTableProps {
	books: Book[];
}

const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>;
	}

	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Pages</th>
					<th>Published</th>
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
						<td>{book.pages}</td>
						<td>{book.published}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTable;
