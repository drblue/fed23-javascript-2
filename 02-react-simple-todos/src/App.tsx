import { useState } from "react";
import { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Make coffee", completed: true },
		{ id: 2, title: "Drink coffee", completed: false },
		{ id: 3, title: "Drink MOAR coffee", completed: false },
		{ id: 4, title: "Drink ALL ZE coffee", completed: false },
	]);
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputNewTodoTitle,
			completed: false,
		}]);

		setInputNewTodoTitle("");
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

	return (
		<div className="container">
			<h1>React Simple Todos</h1>

			<form onSubmit={handleAddTodo} className="mb-3">
				<div className="input-group">
					<input
						aria-label="New todo title"
						className="form-control"
						onChange={e => setInputNewTodoTitle(e.target.value)}
						placeholder="Learn about GTD"
						type="text"
						value={inputNewTodoTitle}
					/>

					<button className="btn btn-success" type="submit">👶🏻</button>
				</div>
			</form>

			{todos.length > 0 && (
				<>
					<h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>
					<ul className="todolist list-group">
						{unfinishedTodos.map(todo => (
							<li key={todo.id} className={todo.completed ? "done list-group-item" : "list-group-item"}>
								<span className="todo-title">{todo.title}</span>

								<div>
									<button
										className="btn btn-sm btn-outline-warning me-2"
										onClick={() => handleToggleTodo(todo)}
									>{todo.completed ? "✅" : "☑️"}</button>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDeleteTodo(todo)}
									>💣</button>
								</div>
							</li>
						))}
					</ul>

					<h2 className="mb-2 h5">🥺 Stuff I've done</h2>
					<ul className="todolist list-group">
						{finishedTodos.map(todo => (
							<li key={todo.id} className={todo.completed ? "done list-group-item" : "list-group-item"}>
								<span className="todo-title">{todo.title}</span>

								<div>
									<button
										className="btn btn-sm btn-outline-warning me-2"
										onClick={() => handleToggleTodo(todo)}
									>{todo.completed ? "✅" : "☑️"}</button>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDeleteTodo(todo)}
									>💣</button>
								</div>
							</li>
						))}
					</ul>

					<p className="mt-3 text-muted">
						{unfinishedTodos.length} out of {todos.length} todos completed.
					</p>
				</>
			)}

			{!todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</div>
	);
}

export default App;
