import { useState } from "react";

function App() {
	const [counter, setCounter] = useState(1);
	const [msg, setMsg] = useState("Hi mom!");
	// let counter = 1;

	console.log("App is being rendered");

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter(counter + 1);
		console.log("Counter after update:", counter);
	}

	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>

			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick} className="btn btn-success">Click me</button>
			<button onClick={() => setMsg("Hi dad!")} className="btn btn-warning">Hi dad?</button>
		</div>
	);
}

export default App;
