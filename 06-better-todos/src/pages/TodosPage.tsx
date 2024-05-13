import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router-dom";
import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../types/Todo";

function TodosPage() {
	const [todos, setTodos] = useState<Todo[] | null>(null);
	const location = useLocation();

	const getTodos = async () => {
		setTodos(null);

		// make request to api
		const data = await TodosAPI.getTodos();

		setTodos(data);
	}

	console.log("Component is rendering");

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			{location.state && location.state.status && (
				<Alert variant={location.state.status.type}>
					{location.state.status.message}
				</Alert>
			)}

			{todos && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map(todo => (
							<ListGroup.Item
								action
								as={Link}
								className={todo.completed ? "done" : ""}
								key={todo.id}
								to={`/todos/${todo.id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter finished={todos.filter(todo => todo.completed).length} total={todos.length} />
				</>
			)}

			{todos && !todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</>
	);
}

export default TodosPage;
