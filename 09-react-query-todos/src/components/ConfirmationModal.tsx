import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ConfirmationModalProps {
	children: React.ReactNode;
	onCancel: () => void;
	onConfirm: () => void;
	show: boolean;
	title?: string;
	variant?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	children,
	onCancel,
	onConfirm,
	show,
	title,
	variant = "primary",
}) => {
	return (
		<Modal show={show} onHide={onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>
					{title || "Confirm"}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{children}
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant={variant} onClick={onConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ConfirmationModal;
