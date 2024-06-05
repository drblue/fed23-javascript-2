import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/TodosAPI";

const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
	});
};

export default useTodos;
