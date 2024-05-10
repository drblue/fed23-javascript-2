import { Todo } from "../types/Todo";

interface TodoListItemProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ onDelete, onToggle, todo }) => {
	return (
		<li className={todo.completed ? "done list-group-item" : "list-group-item"}>
			<span className="todo-title">{todo.title}</span>

			<div>
				<button className="btn btn-sm btn-outline-warning me-2" onClick={() => onToggle(todo)}>
					{todo.completed ? "✅" : "☑️"}
				</button>
				<button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(todo)}>
					💣
				</button>
			</div>
		</li>
	);
};

export default TodoListItem;
