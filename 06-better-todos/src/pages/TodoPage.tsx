import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
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

	// Toggle todo in API
	const toggleTodo = async (todo: Todo) => {
		// Call TodosAPI and update the todo
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});

		// Refresh todo
		getTodo(todoId);
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
				<Button variant="success" onClick={() => toggleTodo(todo)}>Toggle</Button>

				{/* Delete */}
			</div>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
