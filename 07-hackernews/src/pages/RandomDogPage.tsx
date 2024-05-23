import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { changeUrl, data, error, execute, getRandomDogImage, isError, isLoading } = useGetRandomDogImage("mountain/bernese");

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="mb-3">
				<Button
					className="me-1 mb-1"
					variant="warning"
					onClick={() => changeUrl("passwords.txt")}
				>Make things go 💣</Button>

				<Button
					className="me-1 mb-1"
					variant="warning"
					onClick={() => changeUrl("http://löxmidnvt8drycintwrensweiuym.com")}
				>Break stuff ⛓️‍💥</Button>
			</div>

			<div className="mb-3">
				<Button
					className="me-1 mb-1"
					onClick={() => getRandomDogImage()}
				>I ❤️ all doggos</Button>

				<Button
					className="me-1 mb-1"
					onClick={() => getRandomDogImage("shiba")}
				>Shiba fluffer</Button>

				<Button
					className="me-1 mb-1"
					onClick={() => getRandomDogImage("boxer")}
				>Boxer fluffer</Button>

				<Button
					className="me-1 mb-1"
					onClick={() => getRandomDogImage("mountain/bernese")}
				>Bernese Mountain fluffer</Button>

			</div>

			<div className="mb-3">
				<Button
					className="me-1 mb-1"
					onClick={execute}
				>MOAR doggos!! 🐶</Button>
			</div>

			{isError && <Alert variant="warning">{error}</Alert>}

			{isLoading && <p>Loading...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;
