import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodosAPI";

const useTodo = (todoId: number, enabled = true) => {
	return useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => getTodo(todoId),
		enabled,
	});
};

export default useTodo;
