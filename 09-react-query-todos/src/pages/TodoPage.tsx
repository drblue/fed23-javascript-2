import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useTodo from "../hooks/useTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const location = useLocation();
	const navigate = useNavigate();

	const {
		data: todo,
		error,
		isError,
		isLoading,
		isSuccess,
	} = useTodo(todoId, queryEnabled);

	const deleteTodoMutation = useDeleteTodo(
		todoId,
		() => {
			// disable queries related to the todo we're deleting
			setQueryEnabled(false);
		},
		() => {
			// Redirect to "/todos"
			navigate("/todos", {
				replace: true,
				state: {
					status: {
						message: `Todo was deleted`,
						type: "success",
					}
				}
			});
		}
	);

	const updateTodoCompletedMutation = useUpdateTodo(todoId);

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return (
			<Alert variant="warning">{error.message}</Alert>
		)
	}

	return isSuccess && (
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

			<p>
				<strong>Status:</strong> {todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span> }
			</p>

			<div className="buttons mb-3">
				<Button
					disabled={updateTodoCompletedMutation.isPending || deleteTodoMutation.isPending}
					onClick={() => updateTodoCompletedMutation.mutate({ completed: !todo.completed })}
					variant="success"
				>Toggle</Button>

				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">Edit</Link>

				<Button
					disabled={deleteTodoMutation.isPending}
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>
				<ConfirmationModal
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={deleteTodoMutation.mutate}
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
