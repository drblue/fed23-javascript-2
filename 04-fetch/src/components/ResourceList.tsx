import { Resource } from '../types/Resource';

interface ResourceListProps {
	data: Resource[];
	error: string | false;
	isLoading: boolean;
	resource: string;
}

const ResourceList: React.FC<ResourceListProps> = ({ data, error, isLoading, resource }) => {

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <div className="alert alert-warning">{error}</div>
	}

	if (!resource) {
		return <p>Please select a resource to view</p>
	}

	if (!data.length) {
		return <p>No data exists</p>
	}

	return (
		<>
			<h2>{resource}</h2>
			<p>There are {data.length} {resource}.</p>

			<ol>
				{data.map(item => (
					<li key={item.id}>{item.title}</li>
				))}
			</ol>
		</>
	)
}

export default ResourceList
