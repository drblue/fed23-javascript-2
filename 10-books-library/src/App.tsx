import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalLoadingSpinner from "./components/GlobalLoadingSpinner";
import Navigation from "./pages/partials/Navigation";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/authors" element={<AuthorsPage />} />
					<Route path="/authors/:id" element={<AuthorPage />} />
					<Route path="/books" element={<BooksPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
			<ToastContainer
				// position="bottom-right"
				// autoClose={3000}  // close automatically after 3 seconds instead of the default 5 seconds
				// autoClose={false}  // don't close automatically
				// pauseOnFocusLoss={false}  // continue autoclose even if window isn't in focus
				closeOnClick // close on click (duh)
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	);
}

export default App;
