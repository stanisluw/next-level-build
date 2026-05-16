import { useParams } from 'react-router';

export default function ProjectPage() {
	const { projectId } = useParams();

	return <div>Project {projectId}</div>;
}
