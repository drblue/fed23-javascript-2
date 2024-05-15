import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import SadKittyCat from "../assets/images/sad-kitten.gif";

const NotFoundPage = () => {
	return (
		<>
			<h1>Sorry, that page could not be found 😔</h1>

			<div className="mb-4">
				<Image src={SadKittyCat} fluid />
			</div>

			<Link to="/">
				<Button variant="primary">Screw you guys, I'm going hööme</Button>
			</Link>
		</>
	)
}

export default NotFoundPage;
