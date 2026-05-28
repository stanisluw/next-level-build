import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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

export default function ProjectsPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const filteredProjects = projects.filter((project) =>
		project.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleRowClick = (projectId: number) => {
		navigate(`/resource/${projectId}`);
	};

	const columns: ColumnsType<Project> = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Руководитель',
			dataIndex: 'manager',
			key: 'manager',
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => (
				<Tag color={status === 'Активный' ? 'green' : 'red'}>{status}</Tag>
			),
		},
		{
			title: 'Последняя активность',
			dataIndex: 'lastActivity',
			key: 'lastActivity',
		},
	];

	return (
		<div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
			<Card>
				<div
					style={{
						marginBottom: 27,
						alignItems: 'center',
					}}
				>
					<h1
						style={{
							fontSize: 24,
							fontWeight: 'bold',
							margin: 0,
							marginBottom: 16,
						}}
					>
						Проекты
					</h1>
					<Space>
						<Input
							placeholder='Поиск'
							prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							style={{ width: 250 }}
							allowClear
						/>
						<span style={{ color: '#6b7280' }}>
							Всего: {filteredProjects.length} проектов
						</span>
					</Space>
				</div>

				<Table
					columns={columns.map((col) => ({
						...col,
						onHeaderCell: () => ({
							style: { background: '#4F8BFF', color: 'white' },
						}),
					}))}
					dataSource={filteredProjects}
					rowKey='id'
					pagination={{ pageSize: 3 }}
					onRow={(record) => ({
						onClick: () => handleRowClick(record.id),
						style: { cursor: 'pointer' },
					})}
				/>
			</Card>
		</div>
	);
}
