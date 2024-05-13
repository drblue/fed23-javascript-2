import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Todo } from "../types/Todo";
import * as TodosAPI from "../services/TodosAPI";

const TodoPage = () => {
	const [todo, setTodo] = useState<Todo | null>(null);
	const { id } = useParams();
	const todoId = Number(id);

	// Get todo from API
	const getTodo = async (id: number) => {
		// call TodosAPI
		const data = await TodosAPI.getTodo(id);

		// update todo state with data
		setTodo(data);
	}

	useEffect(() => {
		getTodo(todoId);
	}, [todoId]);

	if (!todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1>{todo.title} {id}</h1>

			<p>
				<strong>Status:</strong> {todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span> }
			</p>

			<div className="buttons mb-3">
				{/* Toggle */}

				{/* Delete */}
			</div>

			{/* Here be button-link back to all todos */}
		</>
	)
}

export default TodoPage;
