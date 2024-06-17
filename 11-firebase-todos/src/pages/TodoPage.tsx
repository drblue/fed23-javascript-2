import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useStatusLocation from "../hooks/useStatusLocation";
import { Todo } from "../types/Todo.types";
import { todosCol } from "../services/firebase";

const TodoPage = () => {
	const [todo, setTodo] = useState<Todo | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const location = useStatusLocation();

	const getData = async (documentId: string) => {
		setError(false);
		setLoading(true);
		setTodo(null);

		// Get reference to document in "todos" collection
		const docRef = doc(todosCol, documentId);
		const docSnapshot = await getDoc(docRef);

		if (!docSnapshot.exists()) {
			setTodo(null);
			setError(true);
			setLoading(false);
			return;
		}

		const data = {
			...docSnapshot.data(),
			_id: docSnapshot.id,
		}

		setTodo(data);
		setLoading(false);
	}

	// Get todo on component mount
	useEffect(() => {
		if (!id) {
			return;
		}

		getData(id);
	}, [id]);

	if (error) {
		return <p>Ooops, bad stuff happend. Try again later?</p>
	}

	if (loading || !todo) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1 title={`Todo #${todo._id}`}>{todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? (
					<span className="completed">Completed</span>
				) : (
					<span className="not-completed">Not completed</span>
				)}
			</p>

			<div className="buttons mb-3">
				<Button onClick={() => console.log("Would toggle todo")} variant="success">
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				<Button onClick={() => setShowDeleteModal(true)} variant="danger">
					Delete
				</Button>
			</div>

			<ConfirmationModal
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={() => console.log("Would delete todo with id:", id)}
				show={showDeleteModal}
				title="Confirm delete"
				variant="danger"
			>
				Delete todo "{todo.title}"?
			</ConfirmationModal>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	);
};

export default TodoPage;
