import { useEffect, useState } from "react";
import ResourceList from "./components/ResourceList";
import { getResource } from "./services/JSONPlaceholderAPI";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";

function App() {
	const [resource, setResource] = useState("");
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | false>(false);

	useEffect(() => {
		console.log("Side-effect triggered due to resource changing value to:", resource);

		const fetchData = async () => {
			if (!resource) {
				return;
			}

			// reset state
			setData([]);
			setError(false);
			setIsLoading(true);

			try {
				// make the actual request
				const payload = await getResource(resource);

				// set data to payload and loading state to false
				setData(payload);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("This should really never happen...");
				}
			}

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

			<ResourceList
				data={data}
				error={error}
				isLoading={isLoading}
				resource={resource}
			/>
		</div>
	)
}

export default App;
