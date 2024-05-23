import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import useChuckNorrisJoke from "../hooks/useChuckNorrisJoke";
import BorderSpinner from "../components/spinners/BorderSpinner";

const ChuckNorrisPage = () => {
	const { data, error, execute, isError, isLoading } = useChuckNorrisJoke();

	return (
		<>
			<h1>A Chuck Norris fact</h1>

			<div className="d-flex justify-content-center mb-3">
				<Button
					disabled={isLoading}
					onClick={execute}
				>
					{isLoading && <BorderSpinner />} MOAR!!
				</Button>
			</div>

			{isError && <Alert variant="warning">{error}</Alert>}

			<div>
				{data && (
					<p className="display-1 text-center">
						{data.value}
					</p>
				)}
			</div>
		</>
	)
};

export default ChuckNorrisPage;
