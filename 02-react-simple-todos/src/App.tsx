import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodosAPI from "./services/TodosAPI";
import { NewTodo, Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = async (todo: NewTodo) => {
		// const newTodo = await TodosAPI.createTodo(todo);
		// setTodos([...todos, newTodo]);
		await TodosAPI.createTodo(todo);
		getTodos();
	}

	const getTodos = async () => {
		setTodos([]);

		// make request to api
		const data = await TodosAPI.getTodos();

		setTodos(data);
	}

	const handleDeleteTodo = async (todo: Todo) => {
		await TodosAPI.deleteTodo(todo.id);
		getTodos();
	}

	const handleToggleTodo = (todo: Todo) => {
		// FIX ME
	}

	const finishedTodos = todos.filter(todo => todo.completed);
	const unfinishedTodos = todos.filter(todo => !todo.completed);

	console.log("Component is rendering");

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container">
			<h1>React Simple Todos</h1>

			<AddNewTodoForm
				onAddTodo={addTodo}
			/>

			{todos.length > 0 && (
				<>
					<h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>
					<TodoList
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
						todos={unfinishedTodos}
					/>

					<h2 className="mb-2 h5">🥺 Stuff I've done</h2>
					<TodoList
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
						todos={finishedTodos}
					/>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{!todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</div>
	);
}

export default App;
