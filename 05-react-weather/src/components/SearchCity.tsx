const SearchCity = () => {
	return (
		<div id="search-wrapper">
			<form id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for"
						aria-label="City"
						aria-details="Search for city to show current weather for."
					/>

					<button type="submit" className="btn btn-success">
						🔍
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchCity;
