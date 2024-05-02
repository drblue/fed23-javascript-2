import { useState } from "react";

const Counter = () => {
	const [counter, setCounter] = useState(1);

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter( (prevCounter) => prevCounter + 1 );   // prevCounter = 1, return 2
		console.log("Counter after update:", counter);
	}
	console.log("Counter is being rendered");

	return (
		<div>
			<h2>Counter</h2>
			<p>You have clicked the button {counter} times.</p>

			<button onClick={handleBtnClick} className="btn btn-success btn-lg">👆🏻 me!</button>
		</div>
	)
}

export default Counter;
