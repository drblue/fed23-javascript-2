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

				<Button
					onClick={() => toast.success("Wow, such success, very influencer, much money! 💰", {
						icon: () => "🚀"
					})}
					variant="success"
				>Click me 🤑</Button>

				<Button
					onClick={() => toast.warn("Wow, such WARNING, very ALERT!")}
					variant="warning"
				>Call da police 👮🏻</Button>

				<Button
					onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")}
					variant="danger"
				>Blow shit up 💣</Button>

				<Button
					onClick={() => toast.info("LIKE && SUBSCRIBE")}
					variant="info"
				>Booooring 🥱</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
