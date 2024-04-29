import { useState } from "react";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [counter, setCounter] = useState(1);
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	]);

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

			<ul>
				{posts.map(post =>
					<li key={post.id}>{post.title} ({post.likes} likes)</li>
				)}
			</ul>

			<button onClick={handleBtnClick} className="btn btn-success">Click me</button>
			<button onClick={() => setMsg("Hi dad!")} className="btn btn-warning">Hi dad?</button>
		</div>
	);
}

export default App;
