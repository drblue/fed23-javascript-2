import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import { Author } from "../../services/BooksAPI.types";
import useUpdateAuthor from "../../hooks/useUpdateAuthor";
import { AuthorSchema, authorSchema } from "../../schemas/AuthorSchema";

interface AuthorFormProps {
	author?: Author;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ author }) => {
	const { control, handleSubmit, register, formState: { errors } } = useForm<AuthorSchema>({
		defaultValues: {
			name: author?.name,
			date_of_birth: author?.date_of_birth,
		},
		resolver: zodResolver(authorSchema),
	});
	const createAuthorMutation = useCreateAuthor();
	const updateAuthorMutation = useUpdateAuthor(author?.id ?? 0);

	const onAuthorSubmit: SubmitHandler<AuthorSchema> = (data) => {
		console.log("Submitted data:", data);

		// if we were passed an author via props then we should update
		// otherwise create
		if (author) {
			updateAuthorMutation.mutate(data);
		} else {
			createAuthorMutation.mutate(data);
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onAuthorSubmit)}>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Author Name</Form.Label>
					<Form.Control
						placeholder="Astrid Lindgren"
						type="text"
						{...register("name")}
					/>
					{errors.name && <p className="invalid">{errors.name.message}</p>}
				</Form.Group>

				<Form.Group className="mb-3" controlId="date_of_birth">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="date"
						{...register("date_of_birth")}
					/>
					{errors.date_of_birth && <p className="invalid">{errors.date_of_birth.message}</p>}
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit">
						Save
					</Button>
				</div>
			</Form>

			<DevTool control={control} />
		</>
	);
};

export default AuthorForm;
