import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { changeUrl, data, error, execute, isError, isLoading } = useGetRandomDogImage();

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => changeUrl("https://dog.ceo/api/breeds/image/random")}
				>Random doggo</Button>

				<Button
					className="ms-1"
					onClick={() => changeUrl("https://dog.ceo/api/breed/shiba/images/random")}
				>Random Shiba fluffer</Button>

				<Button
					className="ms-1"
					onClick={execute}
				>MOAR doggos!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => changeUrl("passwords.txt")}
				>Make things go 💣</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => changeUrl("http://löxmidnvt8drycintwrensweiuym.com")}
				>Break stuff ⛓️‍💥</Button>
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
