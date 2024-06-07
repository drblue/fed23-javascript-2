import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardChecklist } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { createTodo, getTodos } from "../services/TodosAPI";
import { Todo } from "../services/TodosAPI.types";

const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTodo,
		onSuccess: async (newTodo) => {
			// get ["todos"] from the cache if it exists and is fresh,
			// otherwise fetch it from the API
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: getTodos,
			});

			// instead of invalidating the ["todos"] query, we can construct new data
			// based on the previous data + newly created todo from the create Todo request
			// **ONLY** append the new todo if it's not already in the cache
			if (!cachedTodos.find(todo => todo.id === newTodo.id)) {
				queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
					return [
						...oldTodos ?? [],
						newTodo,
					];
				});
			}

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo);

			// 🥂
			toast.success("Todo created 🤩", { icon: CardChecklist });
		}
	})
};

export default useCreateTodo;
