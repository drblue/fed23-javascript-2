import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="app" className="container">
			<SearchCity />

			<Forecast />
		</div>
	);
}

export default App;
