import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
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
	// ID
	columnHelper.group({
		id: "id-group",
		columns: [
			columnHelper.accessor("id", {
				header: "ID",
			}),
		],
	}),

	// Author Details
	columnHelper.group({
		header: "Author Details",
		columns: [
			columnHelper.accessor("name", {
				header: "Name",
				cell: (props) => (
					<Link to={"/authors/" + props.row.original.id}>
						{props.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor("date_of_birth", {
				header: "Date of birth",
				meta: {
					align: "end",
				},
			}),
		],
	}),

	// Actions
	columnHelper.group({
		id: "actions-group",
		columns: [
			columnHelper.display({
				header: "Actions",
				cell: (props) => (
					<div className="d-flex gap-1">
						<Link
							className="btn btn-primary btn-sm"
							to={"/authors/" + props.row.original.id}
						>
							View
						</Link>
					</div>
				),
			}),
		],
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
