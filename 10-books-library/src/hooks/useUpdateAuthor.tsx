import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAuthor } from "../services/BooksAPI";
import { NewAuthor } from "../services/BooksAPI.types";

const useUpdateAuthor = (authorId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<NewAuthor>) => updateAuthor(authorId, data),
		onError: () => {
			// 😳
			toast.warning(
				<>
					<strong>Something bad happened 😳!</strong>
					<br />
					It was not possible to update the author. Please try again later.
				</>
			);
		},
		onSuccess: (author) => {
			// invalidate the authors list (or use the fetchQuery + setQueryData
			// from `09-react-query-todos/src/hooks/useCreateTodo.ts`)
			queryClient.invalidateQueries({
				queryKey: ["authors"],
			});

			// also invalidate the author
			queryClient.invalidateQueries({
				queryKey: ["author", { id: author.id }],
			});

			// 🥂
			toast.success("Author updated 🤩");
		},
	});
};

export default useUpdateAuthor;
