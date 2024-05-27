import { useQuery } from "@tanstack/react-query";
import { getRandomDadJoke } from "../services/ICanHazDadJokeApi";

const ICanHazDadJokePage = () => {
	const { data } = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

	return (
		<>
			<h1>Random Dad Joke</h1>

			<div>
				<p className="display-5 text-center my-5">{data && data.joke}</p>
			</div>
		</>
	);
};

export default ICanHazDadJokePage;
