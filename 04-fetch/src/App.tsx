import { useEffect, useState } from "react";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";

function App() {
	const [resource, setResource] = useState("");
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!resource) {
			return;
		}

		console.log("Side-effect triggered due to resource changing value to:", resource);

		const fetchData = async () => {
			setData([]);
			setIsLoading(true);
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);
			const payload = await res.json();
			await new Promise(r => setTimeout(r, 2500));
			setData(payload);
			setIsLoading(false);
		}
		fetchData();
	}, [resource]);

	console.log("Rendering... Resource is:", resource);

	return (
		<div className="container">
			<h1 className="mb-3">🐶 Fetch</h1>

			<div className="d-flex justify-content-between mb-5">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource('memes')} className="btn btn-info">Memes</button>
			</div>

			{isLoading && <p>Loading...</p>}

			{!isLoading && resource && data.length > 0 && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>

					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	)
}

export default App;
