import { useEffect, useRef, useState } from 'react';
import { NewTodo } from '../types/Todo';

interface AddNewTodoFormProps {
	onAddTodo: (todo: NewTodo) => void;
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAddTodo }) => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const inputNewTodoTitleRef = useRef<HTMLInputElement>(null);

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// create a new todo
		const newTodo = {
			title: inputNewTodoTitle.trim(),
			completed: false,
		}

		// give new todo to App
		onAddTodo(newTodo);

		// clear input value
		setInputNewTodoTitle("");
	}

	// On component mount, focus on the input field
	useEffect(() => {
		inputNewTodoTitleRef.current?.focus();
	}, []);

	return (
		<form onSubmit={handleAddTodo} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={e => setInputNewTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					ref={inputNewTodoTitleRef}
					required
					type="text"
					value={inputNewTodoTitle}
				/>

				<button
					className="btn btn-success"
					disabled={inputNewTodoTitle.trim().length < 3}
					type="submit"
				>👶🏻</button>
			</div>

			{inputNewTodoTitle.trim().length > 0 && inputNewTodoTitle.trim().length < 3 && (
				<div className="form-text text-danger">Please enter 3 chars or more</div>
			)}
		</form>
	)
}

export default AddNewTodoForm
