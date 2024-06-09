import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../services/BooksAPI";

const useAuthors = () => {
	return useQuery({
		queryKey: ["authors"],
		queryFn: () => getAuthors(),
	});
};

export default useAuthors;
