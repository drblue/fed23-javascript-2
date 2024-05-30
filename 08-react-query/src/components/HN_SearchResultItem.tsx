import ListGroupItem from "react-bootstrap/ListGroupItem";
import { HN_SearchHit } from "../services/HackerNewsAPI.types";

interface HN_SearchResultProps {
	item: HN_SearchHit;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "full",
	timeStyle: "short",
	// year: "numeric",
	// month: "long",
	// day: "numeric",
	// hour: "numeric",
	// minute: "numeric",
	// second: "numeric",
	// timeZoneName: "short",
});

const isoToFormattedString = (isoDate: string) => {
	const date = new Date(isoDate);
	return dateFormatter.format(date);
}

const HN_SearchResultItem: React.FC<HN_SearchResultProps> = ({ item }) => {
	return (
		<ListGroupItem
			action
			href={item.url}
			target="_blank"
			rel="nofollow noreferrer"
		>
			<h2 className="h3">{item.title}</h2>
			<p className="text-muted small mb-0">
				{item.points} points by {item.author} at {isoToFormattedString(item.created_at)}
			</p>
		</ListGroupItem>
	)
}

export default HN_SearchResultItem;
