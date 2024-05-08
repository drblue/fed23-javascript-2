import { useState } from "react";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import { WeatherReport } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<WeatherReport | null>(null);

	const handleSearch = async (location: string) => {
		console.log("Someone wants the weather for:", location);

		// Call API and ask for weather in `location`
		const data = await getCurrentWeather(location);

		// Update current weather state with the weather in `location`
		setCurrentWeather(data);
	}

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />

			{currentWeather && <Forecast data={currentWeather} />}
		</div>
	);
}

export default App;
