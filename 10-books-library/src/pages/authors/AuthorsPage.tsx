import { createColumnHelper } from "@tanstack/react-table";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import WarningAlert from "../../components/alerts/WarningAlert";
import PageTransition from "../../components/animations/PageTransition";
import AuthorForm from "../../components/forms/AuthorForm";
import TanstackSortableTable from "../../components/tables/TanstackSortableTable";
import useAuthors from "../../hooks/useAuthors";
import { Author } from "../../services/BooksAPI.types";

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
							className="btn btn-warning btn-sm"
							to={"/authors/" + props.row.original.id + "/edit"}
						>
							Edit
						</Link>
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
		<PageTransition id="authors-page" key="authors-page">
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading authors...</p>}

			{authors && <TanstackSortableTable columns={columns} data={authors} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<AuthorForm />
				</Card.Body>
			</Card>
		</PageTransition>
	);
};

export default AuthorsPage;
