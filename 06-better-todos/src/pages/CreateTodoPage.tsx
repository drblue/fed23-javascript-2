import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm"
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo, Todo } from "../types/Todo";

const CreateTodoPage = () => {
	const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);
	const [error, setError] = useState<string | false>(false);

	const addTodo = async (todo: NewTodo) => {
		setCreatedTodo(null);
		setError(false);

		try {
			const data = await TodosAPI.createTodo(todo);

			setCreatedTodo(data);
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
					<p>Created todo successfully</p>

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
