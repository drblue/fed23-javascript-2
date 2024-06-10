import { ColumnDef } from "@tanstack/react-table";
import WarningAlert from "../components/alerts/WarningAlert";
import TanstackBasicTable from "../components/TanstackBasicTable";
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

			{books && <TanstackBasicTable columns={columnDefs} data={books} />}
		</>
	);
};

export default BooksPage;
