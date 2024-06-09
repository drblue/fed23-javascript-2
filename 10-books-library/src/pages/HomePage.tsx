import Image from "react-bootstrap/Image";
import imgIpadFrozen from "../assets/images/ipad-frozen.jpg";

const HomePage = () => {
	return (
		<>
			<h1>Books Library</h1>

			<Image
				src={imgIpadFrozen}
				alt="Cartoon drawing with a child holding up a book to a parent and saying 'This iPad is frozen'"
				title="This iPad is frozen"
				fluid
			/>
		</>
	);
};

export default HomePage;
