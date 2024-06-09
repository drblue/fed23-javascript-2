import WarningAlert from "../components/alerts/WarningAlert";
import BookList from "../components/BookList";
import useBooks from "../hooks/useBooks";

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

			{books && <BookList books={books} />}
		</>
	);
};

export default BooksPage;
