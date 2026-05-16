import { useParams } from 'react-router';

export default function EmployeePage() {
	const { employeeId } = useParams();

	return <div>Employee {employeeId}</div>;
}
