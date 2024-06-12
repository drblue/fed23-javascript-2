import { createColumnHelper } from "@tanstack/react-table";
import WarningAlert from "../components/alerts/WarningAlert";
import TanstackBasicTable from "../components/TanstackBasicTable";
import useAuthors from "../hooks/useAuthors";
import { Author } from "../services/BooksAPI.types";

/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "date_of_birth",
		header: "Date of birth",
		meta: {
			align: "end",
		},
	},
];
*/

const columnHelper = createColumnHelper<Author>();

const columns = [
	columnHelper.accessor("name", {
		header: "Name",
	}),
	columnHelper.accessor("date_of_birth", {
		header: "Date of birth",
		meta: {
			align: "end",
		},
	}),
];


const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors();

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading authors...</p>}

			{authors && <TanstackBasicTable columns={columns} data={authors} />}
		</>
	);
};

export default AuthorsPage;
