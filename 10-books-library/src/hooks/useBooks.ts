import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/BooksAPI";

const useBooks = () => {
	return useQuery({
		queryKey: ["books"],
		queryFn: () => getBooks(),
	});
};

export default useBooks;
