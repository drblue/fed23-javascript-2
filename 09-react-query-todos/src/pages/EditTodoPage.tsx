import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../services/TodosAPI";

const EditTodoPage = () => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!todo) {
			return;
		}

		// Call TodosAPI and update the todo
		await updateTodo(todo.id, {
			title: inputNewTodoTitle,
		});

		// Redirect user back to /todos/:id
		navigate(`/todos/${todo.id}`);
	}

	useEffect(() => {
		// getTodo(todoId);
	}, [todoId]);

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

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage;
