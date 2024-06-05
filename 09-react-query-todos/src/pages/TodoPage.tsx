import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodos, updateTodo } from "../services/TodosAPI";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import { Todo } from "../services/TodosAPI.types";
import useTodo from "../hooks/useTodo";

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		data: todo,
		error,
		isError,
		isLoading,
		isSuccess,
	} = useTodo(todoId, queryEnabled);

	const deleteTodoMutation = useMutation({
		mutationFn: () => deleteTodo(todoId),
		onSuccess: async () => {
			// disable query for this specific single todo
			setQueryEnabled(false);

			// make sure we have ["todos"] in the cache
			await queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
			});

			// remove the current query from the cache
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] });

			// construct new data where the deleted todo is removed
			// and set it as the ["todos"] data
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
				return oldTodos?.filter(todo => todo.id !== todoId) ?? [];
			});

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
		},
	});

	const updateTodoCompletedMutation = useMutation({
		mutationFn: (completed: boolean) => updateTodo(todoId, { completed }),
		onSuccess: async (updatedTodo) => {
			// set the response from the mutation as the query cache for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// prefetch ["todos"] query as it is very likely that the user will
			// return to the list of all todos as their next step
			await queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
				staleTime: 0,   // always prefetch, even if the existing data is considered fresh 🌱
			});
		}
	});

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
					onClick={() => updateTodoCompletedMutation.mutate(!todo.completed)}
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
