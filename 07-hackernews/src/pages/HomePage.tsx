import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContextProvider";

const HomePage = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {theme}</p>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	);
};

export default HomePage;
