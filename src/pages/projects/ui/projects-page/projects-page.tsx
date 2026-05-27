import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Project {
	id: number;
	name: string;
	manager: string;
	status: 'Активный' | 'Не активен';
	lastActivity: string;
}

const projects: Project[] = [
	{
		id: 1,
		name: 'Проект 1',
		manager: 'Имя Фамилия',
		status: 'Активный',
		lastActivity: '05.02.2026',
	},
	{
		id: 2,
		name: 'Проект 2',
		manager: 'Имя Фамилия',
		status: 'Активный',
		lastActivity: '20.02.2026',
	},
	{
		id: 3,
		name: 'Проект 3',
		manager: 'Имя Фамилия',
		status: 'Не активен',
		lastActivity: '28.01.2026',
	},
];

const StatusBadge = ({ status }: { status: Project['status'] }) => {
	const variants = {
		Активный: 'bg-green-100 text-green-800',
		'Не активен': 'bg-red-100 text-red-800',
	};
	return (
		<span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[status]}`}>
			{status}
		</span>
	);
};

export default function ProjectsPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const filteredProjects = projects.filter((project) =>
		project.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleRowClick = (projectId: number) => {
		navigate(`/resource/${projectId}`);
	};

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold text-gray-800 mb-6'>Проекты</h1>

			<div className='mb-4 flex justify-between items-center'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
					<input
						type='text'
						placeholder='Поиск'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-primary'
					/>
				</div>
				<div className='text-sm text-gray-500'>
					Всего: {filteredProjects.length} проектов
				</div>
			</div>

			<div className='border rounded-lg overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-primary'>
						<tr>
							<th className='px-4 py-3 text-left text-sm font-semibold text-white'>
								Название
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-white'>
								Руководитель
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-white'>
								Статус
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-white'>
								Последняя активность
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredProjects.map((project, idx) => (
							<tr
								key={project.id}
								onClick={() => handleRowClick(project.id)}
								className={`border-b hover:bg-blue-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
							>
								<td className='px-4 py-3 text-sm text-gray-700'>{project.name}</td>
								<td className='px-4 py-3 text-sm text-gray-700'>
									{project.manager}
								</td>
								<td className='px-4 py-3 text-sm text-gray-700'>
									<StatusBadge status={project.status} />
								</td>
								<td className='px-4 py-3 text-sm text-gray-700'>
									{project.lastActivity}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
