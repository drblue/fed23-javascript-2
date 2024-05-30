import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { searchByDate } from "../services/HackerNewsAPI";
import HN_SearchResultItem from "../components/HN_SearchResultItem";

const SearchHNPage = () => {
	const [page, setPage] = useState(0);
	const [searchInput, setSearchInput] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const searchInputEl = useRef<HTMLInputElement>(null);

	// get `query` from URLSearchParams
	const query = searchParams.get("query") ?? "";    //    "/search-hn?query=tesla"

	const { data: searchResult, error, isError, isFetching, isSuccess } = useQuery({
		queryKey: ["search-hn", { query, page }],
		queryFn: () => searchByDate(query, page),
		enabled: !!query,
		placeholderData: keepPreviousData,   // show previous data (if available) while a new query is being fetched
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const trimmedSearchInput = searchInput.trim();

		if (trimmedSearchInput.length < 3) {
			return;
		}

		// set query in searchParams and reset page state
		setPage(0);
		setSearchParams({ query: trimmedSearchInput });
	}

	const handleReset = () => {
		setPage(0);
		setSearchInput("");
		setSearchParams({});
		searchInputEl.current?.focus();
	}

	useEffect(() => {
		searchInputEl.current?.focus();
	}, []);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit} onReset={handleReset}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						ref={searchInputEl}
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						disabled={searchInput.trim().length < 2 || isFetching}
						type="submit"
						variant="success"
					>
						Search
					</Button>
					<Button
						type="reset"
						variant="warning"
					>
						Clear
					</Button>
				</div>
			</Form>

			{isError && <Alert variant='warning'>{error.message}</Alert>}

			{isSuccess && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(searchResult.nbHits)} search results for "{searchResult.query}"...</p>

					{searchResult.hits.length > 0 && (
						<ListGroup className="mb-3">
							{searchResult.hits.map((hit) => (
								<HN_SearchResultItem item={hit} key={hit.objectID} />
							))}
						</ListGroup>
					)}

					<Pagination
						hasPreviousPage={!isFetching && searchResult.page > 0}
						hasNextPage={!isFetching && searchResult.page + 1 < searchResult.nbPages}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>
				</div>
			)}

		</>
	)
}

export default SearchHNPage;
