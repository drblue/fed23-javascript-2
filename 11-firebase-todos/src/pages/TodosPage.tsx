import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { CollectionReference, collection, getDocs } from "firebase/firestore";
import AddNewTodoForm from "../components/AddNewTodoForm";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import TodoCounter from "../components/TodoCounter";
import useStatusLocation from "../hooks/useStatusLocation";
import { db } from "../services/firebase";
import { NewTodo, Todo } from "../types/Todo.types";

function TodosPage() {
	const [loading, setLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);
	const location = useStatusLocation();

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo);
	};

	// Get todos
	const getTodos = async () => {
		setLoading(true);

		// Get reference to collection "todos"
		const colRef = collection(db, "todos") as CollectionReference<Todo>;

		// Get query snapshot of collection
		const snapshot = await getDocs(colRef);

		// Loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(), // title, completed
				_id: doc.id,
			}
		});

		setTodos(data);
		setLoading(false);
	}

	// Get todos on component mount
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
				<Button variant="primary" onClick={() => getTodos()}>Reload</Button>
			</div>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<AddNewTodoForm onAddTodo={addTodo} />

			{loading && <p>Loading...</p>}

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
