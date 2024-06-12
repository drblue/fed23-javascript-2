import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createBook } from "../services/BooksAPI";
import { Book } from "../services/BooksAPI.types";

const useCreateBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBook,
		onError: () => {
			// 😳
			toast.warning(
				<>
					<strong>Something bad happened 😳!</strong>
					<br />
					It was not possible to create the book. Please try again later.
				</>
			);
		},
		onSuccess: (newBook) => {
			// update the books list in the cache
			queryClient.setQueryData<Book[]>(["books"], (prevBooks) => {
				return [...(prevBooks ?? []), newBook];
			});

			// also insert the new book into the query cache
			queryClient.setQueryData(["book", { id: newBook.id }], newBook);

			// invalidate the author that we created the book for
			queryClient.invalidateQueries({
				queryKey: ["author", { id: newBook.authorId }],
			});

			// 🥂
			toast.success("Book created 🤩");
		},
	});
};

export default useCreateBook;
