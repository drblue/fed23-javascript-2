import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContextProvider";

const HomePage = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider. SRSLY?!");
	}

	const { isDarkMode, toggleTheme } = themeContext;

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
