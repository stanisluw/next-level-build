import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Employee {
	id: number;
	name: string;
	position: string;
	experience: string;
}

const sampleEmployees: Employee[] = [
	{
		id: 1,
		name: 'Кудрявцев Матвей Сергеевич',
		position: 'Руководитель проектов',
		experience: '15 лет',
	},
	{
		id: 2,
		name: 'Соловьева Василиса Андреевна',
		position: 'Инженер строительного контроля',
		experience: '20 лет',
	},
	{
		id: 3,
		name: 'Минаев Артемий Олегович',
		position: 'Специалист по снабжению и логистике',
		experience: '8 лет',
	},
	{
		id: 4,
		name: 'Маслов Юрий Тимурович',
		position: 'Архитектор-дизайнер',
		experience: '10 лет',
	},
	{
		id: 5,
		name: 'Севастьянова Алёна Михайловна',
		position: 'Инженер-экономист',
		experience: '12 лет',
	},
];

export default function EmployeesPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const filteredEmployees = sampleEmployees.filter((employee) =>
		employee.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleRowClick = (employeeId: number) => {
		console.log('Переход к сотруднику:', employeeId);
		navigate(`/employees/${employeeId}`);
	};

	const columns: ColumnsType<Employee> = [
		{
			title: 'ФИО',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: 'Должность',
			dataIndex: 'position',
			key: 'position',
			sorter: (a, b) => a.position.localeCompare(b.position),
		},
		{
			title: 'Стаж',
			dataIndex: 'experience',
			key: 'experience',
			sorter: (a, b) => {
				const numA = parseInt(a.experience) || 0;
				const numB = parseInt(b.experience) || 0;
				return numA - numB;
			},
		},
	];

	return (
		<div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
			<Card>
				<div
					style={{
						marginBottom: 16,
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
					}}
				>
					<h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>Сотрудники</h1>
					<p style={{ color: '#6b7280', margin: 0, marginBottom: 5 }}>
						Управление списком сотрудников компании
					</p>
					<Space>
						<Input
							placeholder='Поиск'
							prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							style={{ width: 250, marginBottom: 8 }}
							allowClear
						/>
						<span style={{ color: '#6b7280' }}>
							Всего: {filteredEmployees.length} сотрудников
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
					dataSource={filteredEmployees}
					rowKey='id'
					pagination={{
						pageSize: 5,
						showTotal: (total) => `Всего ${total} сотрудников`,
					}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record.id),
						style: { cursor: 'pointer' },
					})}
				/>
			</Card>
		</div>
	);
}
