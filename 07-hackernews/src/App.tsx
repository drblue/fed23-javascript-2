import clsx from "clsx";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import useTheme from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import RandomDogPage from "./pages/RandomDogPage";

function App() {
	const { isDarkMode } = useTheme();

	const cssClasses = clsx({
		"bg-white": !isDarkMode,
		"text-dark": !isDarkMode,
	});
	// console.log("cssClasses:", cssClasses);

	return (
		<div id="App" className={cssClasses}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App;
