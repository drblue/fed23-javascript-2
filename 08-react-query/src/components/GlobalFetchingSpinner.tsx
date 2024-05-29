import { useIsFetching } from "@tanstack/react-query";

const GlobalFetchingSpinner = () => {
	const isFetching = useIsFetching();

	return isFetching ? (
		<div id="cat-wrapper">
			<div className="cat-spinner">
				<span className="cat">🐱</span>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	) : null;
}

export default GlobalFetchingSpinner;
