import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ICanHazDadJokePage from "./pages/ICanHazDadJokePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dad-joke" element={<ICanHazDadJokePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
		</div>
	);
}

export default App;
