import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initing flux capacitor ");
		return new Date().toLocaleTimeString();
	});

	// Start clock when component was mounted for the first time
	useEffect(() => {
		console.log("🔫 Starting clock...");

		setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🏎️ Tick...");
		}, 1000);
	}, []);

	// Update page title with the current time
	// but ONLY if the time has changed since the last render
	useEffect(() => {
		document.title = time;
	}, [time]);

	return (
		<div className="container">
			<div className="display-1 text-center">
				{time}
			</div>
		</div>
	);
}

export default App;
