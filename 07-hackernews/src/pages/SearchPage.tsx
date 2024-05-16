import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { searchByDate as HN_searchByDate } from "../services/HackerNewsAPI";
import { HN_SearchResponse } from "../services/HackerNewsAPI.types";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [searchInput, setSearchInput] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const inputSearchQueryEl = useRef<HTMLInputElement>(null);

	// get "query=" from URL Search Params
	const searchParamsQuery = searchParams.get("query");   // search?query=tesla

	const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
		console.log(`Searching for "${searchQuery}" and page ${searchPage}`);
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

		// get search results from API
		try {
			const data = await HN_searchByDate(searchQuery, searchPage);

			// update state with search results
			setSearchResult(data);

		} catch (err) {
			// handle any errors
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Aouch, stop throwing things that are not Errors at me");
			}
		}

		// set loading to false
		setIsLoading(false);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// 🧹
		const trimmedSearchInput = searchInput.trim();

		// prevent smol haxx0rs
		if (trimmedSearchInput.length < 2) {
			// slap user in face
			return;
		}

		// search HN
		setPage(0);

		// save searchQuery to queryRef
		setSearchParams({ query: trimmedSearchInput });   // search?query=${trimmedSearchInput}
	}

	// React to changes in our page state
	useEffect(() => {
		if (!searchParamsQuery) {
			return;
		}

		searchHackerNews(searchParamsQuery, page);
	}, [searchParamsQuery, page]);

	// Focus on input field
	useEffect(() => {
		inputSearchQueryEl.current?.focus();
	}, []);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						ref={inputSearchQueryEl}
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						disabled={searchInput.trim().length < 2}
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant='warning'>{error}</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{searchParamsQuery}"...</p>

					{searchResult.hits.length > 0 && (
						<ListGroup className="mb-3">
							{searchResult.hits.map((hit) => (
								<ListGroup.Item
									action
									href={hit.url}
									key={hit.objectID}
								>
									<h2 className="h3">{hit.title}</h2>
									<p className="text-muted small mb-0">
										{hit.points} points by {hit.author} at {hit.created_at}
									</p>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}

					<Pagination
						hasPreviousPage={searchResult.page > 0}
						hasNextPage={searchResult.page + 1 < searchResult.nbPages}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>
				</div>
			)}
		</>
	);
};

export default SearchPage;
