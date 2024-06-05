import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodosAPI";

const useTodo = (todoId: number) => {
	return useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => getTodo(todoId),
		// enabled: queryEnabled,
	});
};

export default useTodo;
