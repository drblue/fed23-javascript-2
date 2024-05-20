import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const HomePage = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {isDarkMode ? "dark 🌙" : "light ☀️"}</p>

			<Button onClick={toggleTheme}>
				Switch theme
			</Button>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	);
};

export default HomePage;
