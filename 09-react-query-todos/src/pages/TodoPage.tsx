import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Todo } from "../services/TodosAPI.types";
import * as TodosAPI from "../services/TodosAPI";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import { useQuery } from "@tanstack/react-query";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const location = useLocation();
	const navigate = useNavigate();

	const {
		data: todo,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
	});

	// Delete todo in API
	const deleteTodo = async (todo: Todo) => {
		// Call TodosAPI and delete the todo
		await TodosAPI.deleteTodo(todo.id);

		// Redirect to "/todos"
		navigate("/todos", {
			replace: true,
			state: {
				status: {
					message: `Todo "${todo.title}" was deleted`,
					type: "success",
				}
			}
		});
	}

	// Toggle todo in API
	const toggleTodo = async (todo: Todo) => {
		// Call TodosAPI and update the todo
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});

		// Get the updated todo from the API
		refetch();
	}

	if (!todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${todo.id}`}>{todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert
					hideAfter={1000}
					variant={location.state.status.type}
				>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			{isError && (
				<Alert variant="warning">{error.message}</Alert>
			)}

			<p>
				<strong>Status:</strong> {todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span> }
			</p>

			<div className="buttons mb-3">
				<Button variant="success" onClick={() => toggleTodo(todo)}>Toggle</Button>

				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">Edit</Link>

				<Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
				<ConfirmationModal
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => deleteTodo(todo)}
					show={showDeleteModal}
					title="Confirm delete"
					variant="danger"
				>
					Delete todo "{todo.title}"?
				</ConfirmationModal>
			</div>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
