import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const EditTodoPage = () => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		data: todo,
		error,
		isError,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => getTodo(todoId),
	});

	const updateTodoMutation = useMutation({
		mutationFn: (data: Partial<Todo>) => updateTodo(todoId, data),
		onSuccess: (updatedTodo) => {
			// set the response from the mutation as the query cache for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// invalidate any ["todos"] queries
			queryClient.invalidateQueries({ queryKey: ["todos"] });

			// Redirect user back to /todos/:id
			navigate(`/todos/${todoId}`);
		}
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!todo) {
			return;
		}

		// Call TodosAPI and update the todo
		updateTodoMutation.mutate({
			title: inputNewTodoTitle,
		});
	}

	useEffect(() => {
		if (!todo) {
			return;
		}

		setInputNewTodoTitle(todo.title);
	}, [todo]);

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error.message}</p>

				<Button variant="primary" onClick={() => refetch()}>TRY HARDER!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${todo.id}`}>Edit: {todo.title}</h1>

			{updateTodoMutation.isError && <Alert variant="warning">{updateTodoMutation.error.message}</Alert>}

			<Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={e => setInputNewTodoTitle(e.target.value)}
						value={inputNewTodoTitle}
					/>
				</Form.Group>

				<Button disabled={updateTodoMutation.isPending} variant="primary" type="submit">
					Save
				</Button>
			</Form>

			{updateTodoMutation.isSuccess && (
				<Alert variant="success">
					<h2 className="h5">Todo updated successfully</h2>
					<p>Redirecting back to todo in 2 seconds...</p>

					<Link to={`/todos/${todoId}`} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage;
