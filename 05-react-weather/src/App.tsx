import { useState } from "react";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import { WeatherReport } from "./services/OWMAPI.types";
import Airplane from "./assets/images/747.svg";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<WeatherReport | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (location: string) => {
		setCurrentWeather(null);
		setIsLoading(true);

		try {
			// Call API and ask for weather in `location`
			const data = await getCurrentWeather(location);

			// Update current weather state with the weather in `location`
			setCurrentWeather(data);

		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Something unexpected happened.");
			}
		}

		setIsLoading(false);
	}

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />

			{error && (
				<div className="alert alert-warning">
					{error}
				</div>
			)}

			{isLoading && <img src={Airplane} className="img-fluid py-5 w-100" />}

			{currentWeather && <Forecast data={currentWeather} />}
		</div>
	);
}

export default App;
