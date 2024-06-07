import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/lolcats">link that does not exist</Link>.</p>

			<ButtonGroup>
				<Button
					onClick={() => toast("Wow 🤩! Such click 🐭, much toast 🍞, very celebrate 🥂!")}
					variant="primary"
				>Celebrate 🎉</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
