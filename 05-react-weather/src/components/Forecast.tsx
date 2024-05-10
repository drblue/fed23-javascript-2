import dayBanner from "../assets/images/day.svg";
import nightBanner from "../assets/images/night.svg";
import { WeatherReport } from "../services/OWMAPI.types";

interface ForecastProps {
	data: WeatherReport;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
	const daytime = (data.dt > data.sys.sunrise && data.dt < data.sys.sunset);
	const banner = daytime ? dayBanner : nightBanner;
	const freshness = new Date(data.dt * 1000);

	return (
		<div id="forecast">
			<div className="card">
				<img
					src={banner}
					className="card-img-top"
					alt={daytime ? "Clouds on a bright sky" : "Clouds on a dark sky with a mooncrest"}
				/>

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>,<span id="country">{data.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{data.weather.map(condition => {
							const weatherIconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

							return (
								<li key={condition.id}>
									<img
										src={weatherIconUrl}
										title={condition.description}
										alt={condition.description}
									/>
									{condition.main}
								</li>
							)}
						)}
					</ul>

					<p className="text-muted small">
						<span title={freshness.toString()}>
							{freshness.toLocaleString()}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Forecast;
