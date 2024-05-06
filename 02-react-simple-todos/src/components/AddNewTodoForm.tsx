import { useState } from 'react';
import { Todo } from '../types/Todo';

interface AddNewTodoFormProps {
	onAddTodo: (todo: Todo) => void;
	todos: Todo[];
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAddTodo, todos }) => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// create a new todo
		const newTodo = {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputNewTodoTitle,
			completed: false,
		}

		// give new todo to App
		onAddTodo(newTodo);

		// clear input value
		setInputNewTodoTitle("");
	}

	return (
		<form onSubmit={handleAddTodo} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={e => setInputNewTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					required
					type="text"
					value={inputNewTodoTitle}
				/>

				<button className="btn btn-success" type="submit">👶🏻</button>
			</div>
		</form>
	)
}

export default AddNewTodoForm
