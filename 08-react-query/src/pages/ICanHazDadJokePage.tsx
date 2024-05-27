import { useQuery } from "@tanstack/react-query";
import { getRandomDadJoke } from "../services/ICanHazDadJokeApi";

const ICanHazDadJokePage = () => {
	const {
		data,
		isError,
		isFetching,
		isLoading,
		isPending,
		isRefetching,
		isStale,
		isSuccess,
		status,
	} = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

	return (
		<>
			<h1>Random Dad Joke</h1>

			<pre className="bg-light py-2 px-3">
				isError: {String(isError)}<br />
				isFetching: {String(isFetching)}<br />
				isLoading: {String(isLoading)}<br />
				isPending: {String(isPending)}<br />
				isRefetching: {String(isRefetching)}<br />
				isStale: {String(isStale)}<br />
				isSuccess: {String(isSuccess)}<br />
				status: {status}
			</pre>

			<div>
				<p className="display-5 text-center my-5">{data && data.joke}</p>
			</div>
		</>
	);
};

export default ICanHazDadJokePage;
