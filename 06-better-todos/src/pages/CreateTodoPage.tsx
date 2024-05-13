import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm"
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo, Todo } from "../types/Todo";

const CreateTodoPage = () => {
	const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);
	const [error, setError] = useState<string | false>(false);
	const navigate = useNavigate();

	const addTodo = async (todo: NewTodo) => {
		setCreatedTodo(null);
		setError(false);

		try {
			const data = await TodosAPI.createTodo(todo);

			setCreatedTodo(data);

			setTimeout(() => {
				navigate("/todos");
			}, 2000);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("ERROR: We've reached an unreachable state. Anything is possible. The limits were in our heads all along. Follow your dreams.");
			}
		}
	}

	return (
		<>
			<h1>Create a new Todo</h1>

			{error && <Alert variant="warning">{error}</Alert>}

			<AddNewTodoForm
				onAddTodo={addTodo}
			/>

			{createdTodo && (
				<Alert variant="success">
					<h2 className="h5">Created todo successfully</h2>
					<p>Redirecting back to all todos in 2 seconds...</p>

					<Link to={`/todos/${createdTodo.id}`} className="btn btn-success" role="button">
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
