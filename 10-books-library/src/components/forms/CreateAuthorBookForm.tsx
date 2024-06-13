import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import useCreateBook from "../../hooks/useCreateBook";
import { NewBook } from "../../services/BooksAPI.types";

const currentYear = new Date().getFullYear();

interface CreateAuthorBookFormProps {
	authorId: number;
}

const CreateAuthorBookForm: React.FC<CreateAuthorBookFormProps> = ({ authorId }) => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>();
	const createBookMutation = useCreateBook();

	const onCreateAuthorSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted data:", data);

		createBookMutation.mutate({
			...data,
			authorId,
		});
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					placeholder="Whispers in the Abyss"
					type="text"
					{...register("title", {
						minLength: 3,
						required: true,
					})}
				/>
				{errors.title && <p className="invalid">A book without a title is not a book</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="pages">
				<Form.Label>Number of pages</Form.Label>
				<Form.Control
					type="number"
					{...register("pages", {
						required: true,
						min: 1,
					})}
				/>
				{errors.pages && <p className="invalid">A book has to have at least 1 page</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Year of publication</Form.Label>
				<Form.Control
					type="number"
					{...register("published", {
						required: true,
						min: 1455,
						max: currentYear,
					})}
				/>
				{errors.published && <p className="invalid">Year of publication has to be between 1455 and {currentYear}</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	);
};

export default CreateAuthorBookForm;
