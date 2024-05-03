import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initing flux capacitor ");
		return new Date().toLocaleTimeString();
	});

	useEffect(() => {
		console.log("🔫 Starting clock...");

		setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🏎️ Tick...");
		}, 1000);
	}, []);

	return (
		<div className="container">
			<div className="display-1 text-center">
				{time}
			</div>
		</div>
	);
}

export default App;
