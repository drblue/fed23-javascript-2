import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "../services/BooksAPI";

const useAuthor = (authorId: number) => {
	return useQuery({
		queryKey: ["author", { id: authorId }],
		queryFn: () => getAuthor(authorId),
	});
};

export default useAuthor;
