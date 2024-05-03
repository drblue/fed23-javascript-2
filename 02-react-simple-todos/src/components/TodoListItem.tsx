import { Todo } from "../types/Todo";

interface TodoListItemProps {
	todo: Todo
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
	return (
		<li className={todo.completed ? "done list-group-item" : "list-group-item"}>
			<span className="todo-title">{todo.title}</span>

			<div>
				{/*
				<button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleToggleTodo(todo)}>
					{todo.completed ? "✅" : "☑️"}
				</button>
				<button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTodo(todo)}>
					💣
				</button>
				*/}
			</div>
		</li>
	);
};

export default TodoListItem;
