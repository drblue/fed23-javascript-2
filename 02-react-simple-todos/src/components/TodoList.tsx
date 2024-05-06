import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo } from '../types/Todo'

interface TodoListProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ onDelete, onToggle, todos }) => {
	return (
		<ul className="todolist list-group">
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					onDelete={onDelete}
					onToggle={onToggle}
					todo={todo}
				/>
			))}
		</ul>
	)
}

export default TodoList;
