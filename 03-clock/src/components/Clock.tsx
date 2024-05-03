import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initing flux capacitor ");
		return new Date().toLocaleTimeString();
	});

	// Start clock when component was mounted for the first time
	useEffect(() => {
		console.log("🔫 Starting clock...");

		const tickId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🏎️ Tick...");
		}, 1000);

		return () => {
			// This clean-up function will be executed when
			// the component is about to be unmounted
			console.log("💣💥 Clock is being unmounted 😰 Stopping timer to prevent paradoxes 🤯");
			clearInterval(tickId);
		};
	}, []);

	// Update page title with the current time
	// but ONLY if the time has changed since the last render
	useEffect(() => {
		document.title = time;
	}, [time]);

	return (
		<div className="display-1 text-center">
			{time}
		</div>
	)
}

export default Clock
