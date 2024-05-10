import { useParams } from "react-router-dom";

const TodoPage = () => {
	const { id } = useParams();

	return (
		<>
			<h1>TITLE for todo with id {id}</h1>

			<p><strong>Status:</strong> COMPLETED|NOT COMPLETED</p>

			<div className="buttons mb-3">
				{/* Toggle */}

				{/* Delete */}
			</div>

			{/* Here be button-link back to all todos */}
		</>
	)
}

export default TodoPage;
