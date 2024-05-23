import Spinner from "react-bootstrap/Spinner";

const BorderSpinner = () => {
	return (
		<Spinner animation="border" role="status" variant="light" size="sm">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	)
}

export default BorderSpinner;
