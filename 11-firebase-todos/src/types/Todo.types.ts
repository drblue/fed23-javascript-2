export interface Todo {
	_id: string;
	title: string;
	completed: boolean;
}

export type NewTodo = Omit<Todo, "_id">;
