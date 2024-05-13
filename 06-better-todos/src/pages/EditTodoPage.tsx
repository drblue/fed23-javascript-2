import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../types/Todo";

const EditTodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

	// Get todo from API
	const getTodo = async (id: number) => {
		setError(false);
		setIsLoading(true);
		setTodo(null);

		try {
			// call TodosAPI
			const data = await TodosAPI.getTodo(id);

			// update todo state with data
			setTodo(data);
			setInputNewTodoTitle(data.title);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("ERROR: We've reached an unreachable state. Anything is possible. The limits were in our heads all along. Follow your dreams.");
			}
		}

		setIsLoading(false);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!todo) {
			return;
		}

		// Call TodosAPI and update the todo
		await TodosAPI.updateTodo(todo.id, {
			title: inputNewTodoTitle,
		});

		// Redirect user to /todos/:id
		navigate(`/todos/${todo.id}`);
	}

	useEffect(() => {
		getTodo(todoId);
	}, [todoId]);

	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant="primary" onClick={() => getTodo(todoId)}>TRY HARDER!!!</Button>
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
