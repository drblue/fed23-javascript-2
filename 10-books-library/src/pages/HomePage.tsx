import Image from "react-bootstrap/Image";
import imgIpadFrozen from "../assets/images/ipad-frozen.jpg";
import PageTransition from "../components/animations/PageTransition";

const HomePage = () => {
	return (
		<PageTransition id="home-page" key="home-page">
			<h1>Books Library</h1>

			<Image
				src={imgIpadFrozen}
				alt="Cartoon drawing with a child holding up a book to a parent and saying 'This iPad is frozen'"
				title="This iPad is frozen"
				fluid
			/>
		</PageTransition>
	);
};

export default HomePage;
