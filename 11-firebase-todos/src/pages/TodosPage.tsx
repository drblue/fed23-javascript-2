import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import AddNewTodoForm from "../components/AddNewTodoForm";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import TodoCounter from "../components/TodoCounter";
import useStatusLocation from "../hooks/useStatusLocation";
import { NewTodo, Todo } from "../types/Todo.types";

const todos: Todo[] = [
	{
		_id: "Akpxptx7jdJ7SCOIuD16",
		title: "Learn React 😊",
		completed: true,
	},
	{
		_id: "T4MKhcTg5bOHz80TOXwd",
		title: "Learn Firebase 🔥",
		completed: false,
	},
	{
		_id: "fTZcsgGFiffA4DadSmQ2",
		title: "Profit 💰",
		completed: false,
	},
	{
		_id: "pTLjnG6VDRMwnUqXzTV7",
		title: "Take over the world 😈",
		completed: false,
	},
];

function TodosPage() {
	const location = useStatusLocation();

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo);
	};

	return (
		<>
			<h1>Todos</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map((todo) => (
							<ListGroup.Item
								action
								as={Link}
								className={todo.completed ? "done" : ""}
								key={todo._id}
								to={`/todos/${todo._id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter
						finished={todos.filter((todo) => todo.completed).length}
						total={todos.length}
					/>
				</>
			)}

			{todos && !todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</>
	);
}

export default TodosPage;
