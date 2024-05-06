import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Make coffee", completed: true },
		{ id: 2, title: "Drink coffee", completed: false },
		{ id: 3, title: "Drink MOAR coffee", completed: false },
		{ id: 4, title: "Drink ALL ZE coffee", completed: false },
	]);

	const addTodo = (todo: Todo) => {
		setTodos([...todos, todo]);
	}

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed;
		setTodos([...todos]);
	}

	const handleDeleteTodo = (todo: Todo) => {
		setTodos([...todos.filter(t => t !== todo)]);
	}

	const finishedTodos = todos.filter(todo => todo.completed);
	const unfinishedTodos = todos.filter(todo => !todo.completed);

	console.log("Component is rendering");

	// Our first side-effect
	useEffect(() => {
		// This code will only be executed **AFTER** the component has rendered
		// AND if the length of unfinished todos has changed SINCE THE LAST RENDER
		// console.log("🚨 The length of unfinished todos has changed!");
		document.title = `${unfinishedTodos.length} todos unfinished 🇫🇮`;
	}, [ unfinishedTodos.length ]);

	// This will only be executed when the component is mounted,
	// and only AFTER the component has been rendered
	useEffect(() => {
		// console.log("Look mom, I'm a newly mounted component 👶🏻");
	}, []);

	return (
		<div className="container">
			<h1>React Simple Todos</h1>

			<AddNewTodoForm
				onAddTodo={addTodo}
				todos={todos}
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
