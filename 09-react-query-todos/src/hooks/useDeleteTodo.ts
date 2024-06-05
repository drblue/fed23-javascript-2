import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const useDeleteTodo = (
	todoId: number,
	onMutate: () => void = () => {},
	onSuccess: () => void = () => {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => deleteTodo(todoId),
		onMutate: () => {
			// this will be executed before the mutation happens
			onMutate();
		},
		onSuccess: async () => {
			// make sure we have ["todos"] in the cache
			await queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
			});

			// remove the current query from the cache
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] });

			// construct new data where the deleted todo is removed
			// and set it as the ["todos"] data
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
				return oldTodos?.filter(todo => todo.id !== todoId) ?? [];
			});

			// We're done
			onSuccess();
		},
	});
};

export default useDeleteTodo;
