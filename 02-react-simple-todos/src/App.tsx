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

	return (
		<div className="container">
			<h1>React Simple Todos</h1>

			<ul className="todolist list-group">
				{todos.map(todo => (
					<li key={todo.id} className={todo.completed ? "done list-group-item" : "list-group-item"}>
						<span className="todo-title">{todo.title}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
