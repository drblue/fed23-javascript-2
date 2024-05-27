import { useQuery } from "@tanstack/react-query";
import { getRandomDadJoke } from "../services/ICanHazDadJokeApi";

const HomePage = () => {
	const { data } = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

	return (
		<>
			<h1>I ❤️ React Query</h1>
			<p>React Query untangles states and handles caching, errors, and loads. It makes async easy with simple queries and neat mutations and turns coding into a delight, simplifying every developer’s task.</p>

			<div>
				<p className="display-5 text-center my-5">{data && data.joke}</p>
			</div>
		</>
	);
};

export default HomePage;
