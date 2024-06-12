import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import { NewAuthor } from "../../services/BooksAPI.types";

const CreateAuthorForm = () => {
	const { handleSubmit, register } = useForm<NewAuthor>();

	const onCreateAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
		console.log("Submitted data:", data);
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					placeholder="Astrid Lindgren"
					type="text"
					{...register("name")}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{...register("date_of_birth")}
				/>
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	);
};

export default CreateAuthorForm;
