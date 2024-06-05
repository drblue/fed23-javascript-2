import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm"
import { createTodo } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const CreateTodoPage = () => {
	const queryClient = useQueryClient();

	const createTodoMutation = useMutation({
		mutationFn: createTodo,
		onSuccess: (newTodo) => {
			// instead of invalidating the ["todos"] query, we can construct new data
			// based on the previous data + newly created todo from the create Todo request
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
				return [
					...oldTodos ?? [],
					newTodo,
				];
			});

			setTimeout(() => {
				navigate("/todos");
			}, 2000);
		}
	});

	const navigate = useNavigate();

	return (
		<>
			<h1>Create a new Todo</h1>

			{createTodoMutation.isError && <Alert variant="warning">{createTodoMutation.error.message}</Alert>}

			<AddNewTodoForm
				onAddTodo={createTodoMutation.mutate}
			/>

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<h2 className="h5">Created todo successfully</h2>
					<p>Redirecting back to all todos in 2 seconds...</p>

					<Link to={`/todos/${createTodoMutation.data.id}`} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; Back to all todos
			</Link>
		</>
	)
}

export default CreateTodoPage
