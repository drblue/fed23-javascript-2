import { ColumnDef } from "@tanstack/react-table";
import Card from "react-bootstrap/Card";
import WarningAlert from "../components/alerts/WarningAlert";
import CreateBookForm from "../components/forms/CreateBookForm";
import TanstackSortableTable from "../components/tables/TanstackSortableTable";
import useBooks from "../hooks/useBooks";
import { Book } from "../services/BooksAPI.types";

const columnDefs: ColumnDef<Book>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "pages",
		header: "Pages",
		meta: {
			align: "end",
		},
	},
	{
		accessorKey: "published",
		header: "Published",
		meta: {
			align: "end",
		},
	},
	{
		accessorKey: "author.name",
		header: "Author",
	},
];

const BooksPage = () => {
	const { data: books, isError, isLoading } = useBooks();

	return (
		<>
			<h1 className="mb-3">Books</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching books. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading books...</p>}

			{books && <TanstackSortableTable columns={columnDefs} data={books} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Book</Card.Title>
					<CreateBookForm />
				</Card.Body>
			</Card>
		</>
	);
};

export default BooksPage;
