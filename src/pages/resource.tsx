import { PieChartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Progress, Row, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Employee {
	id: number;
	name: string;
	status: string;
	plan: number;
	actual: number;
}

const employeesData: Employee[] = [
	{ id: 1, name: 'Кудрявцев Матвей Сергеевич', status: 'Активен', plan: 0, actual: 0.71 },
	{ id: 2, name: 'Соловьева Василиса Андреевна', status: 'Активен', plan: 0, actual: 0.2 },
	{ id: 3, name: 'Минаев Артемий Олегович', status: 'Активен', plan: 0, actual: 0.2 },
	{ id: 4, name: 'Маслов Юрий Тимурович', status: 'Отпуск', plan: 0, actual: 0.1 },
	{ id: 5, name: 'Севастьянова Алёна Михайловна', status: 'Активен', plan: 0, actual: 0.2 },
];

const weeksData = [
	{ week: 'Неделя 19', date: '08.04.2026', plan: 0, actual: 0.71 },
	{ week: 'Неделя 20', date: '15.04.2026', plan: 0, actual: 0.71 },
	{ week: 'Неделя 21', date: '22.04.2026', plan: 0, actual: 0.71 },
	{ week: 'Неделя 22', date: '29.04.2026', plan: 0, actual: 0.71 },
	{ week: 'Неделя 23', date: '05.05.2026', plan: 0, actual: 0.71 },
	{ week: 'Неделя 24', date: '12.05.2026', plan: 0, actual: 0.71 },
];

export default function ResourcePage() {
	const navigate = useNavigate();
	const [selectedEmployee, setSelectedEmployee] = useState<string>('Все');
	const [periodMode, setPeriodMode] = useState<'plan' | 'actual'>('actual');
	const [displayMode, setDisplayMode] = useState<'fte' | 'percent' | 'hours'>('fte');

	const totalFte = employeesData.reduce(
		(sum, emp) => sum + (periodMode === 'actual' ? emp.actual : emp.plan),
		0
	);

	const formatValue = (value: number) => {
		if (displayMode === 'fte') return `${value.toFixed(2)} FTE`;
		if (displayMode === 'percent') return `${(value * 100).toFixed(0)}%`;
		return `${Math.round(value * 160)}ч`;
	};

	const columns: ColumnsType<Employee> = [
		{
			title: '№',
			key: 'index',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'ФИО',
			dataIndex: 'name',
			key: 'name',
			width: 250,
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			width: 100,
			render: (status: string) => (
				<Tag color={status === 'Активен' ? 'green' : 'orange'}>{status}</Tag>
			),
		},
		{
			title: 'План',
			dataIndex: 'plan',
			key: 'plan',
			width: 100,
			render: (value: number) => formatValue(value),
		},
		{
			title: 'Факт',
			dataIndex: 'actual',
			key: 'actual',
			width: 100,
			render: (value: number) => (
				<span style={{ color: '#4F8BFF', fontWeight: 'bold' }}>{formatValue(value)}</span>
			),
		},
		{
			title: 'Часы',
			key: 'hours',
			width: 80,
			render: (_, record) => `${Math.round(record.actual * 160)}ч`,
		},
		{
			title: 'Детали',
			key: 'details',
			width: 80,
			render: () => <span className='text-gray-400'>подробнее</span>,
		},
	];

	const expandedRowRender = (record: Employee) => {
		return (
			<div style={{ padding: '16px' }}>
				<h4 style={{ marginBottom: 30 }}>Распределение по неделям</h4>
				<div style={{ display: 'flex', gap: 16, height: 120, alignItems: 'flex-end' }}>
					{weeksData.map((week, i) => (
						<div
							key={i}
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 4,
							}}
						>
							<div style={{ fontSize: 12, color: '#666' }}>{week.week}</div>
							<div
								style={{
									width: '100%',
									backgroundColor: '#4F8BFF',
									borderRadius: '4px 4px 0 0',
									height: `${week.actual * 100}px`,
									minHeight: '4px',
								}}
							/>
							<div style={{ fontSize: 14, fontWeight: 'bold', color: '#4F8BFF' }}>
								{week.actual} FTE
							</div>
							<div style={{ fontSize: 11, color: '#999' }}>{week.date}</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
			<Button
				type='link'
				onClick={() => navigate('/projects')}
				style={{ marginBottom: 16, paddingLeft: 0 }}
			>
				Назад
			</Button>

			<h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Ресурсный учёт</h1>
			<p style={{ color: '#6b7280', marginBottom: 24 }}>
				Планирование ресурсов по сотрудникам
			</p>

			<Card style={{ marginBottom: 24 }}>
				<Row gutter={16}>
					<Col span={6}>
						<div style={{ marginBottom: 8 }}>Выбор сотрудника</div>
						<Select
							value={selectedEmployee}
							onChange={setSelectedEmployee}
							style={{ width: '100%' }}
							options={[
								{ value: 'Все', label: 'Все' },
								...employeesData.map((emp) => ({
									value: emp.name,
									label: emp.name,
								})),
							]}
						/>
					</Col>
					<Col span={6}>
						<div style={{ marginBottom: 8 }}>Период отображения</div>
						<Select
							value={periodMode}
							onChange={setPeriodMode}
							style={{ width: '100%' }}
							options={[
								{ value: 'actual', label: 'Факт' },
								{ value: 'plan', label: 'План' },
							]}
						/>
					</Col>
					<Col span={6}>
						<div style={{ marginBottom: 8 }}>Режим отображения</div>
						<Select
							value={displayMode}
							onChange={setDisplayMode}
							style={{ width: '100%' }}
							options={[
								{ value: 'fte', label: 'FTE' },
								{ value: 'percent', label: '%' },
								{ value: 'hours', label: 'Часы' },
							]}
						/>
					</Col>
					<Col span={6}>
						<Card
							size='small'
							style={{ background: '#eff6ff', textAlign: 'center', border: 'none' }}
						>
							<div style={{ fontSize: 12, color: '#6b7280' }}>Общий FTE</div>
							<div style={{ fontSize: 24, fontWeight: 'bold', color: '#4F8BFF' }}>
								{totalFte.toFixed(2)} FTE
							</div>
						</Card>
					</Col>
				</Row>
			</Card>

			<Row gutter={24}>
				<Col span={16}>
					<Card>
						<Table
							columns={columns}
							dataSource={employeesData}
							rowKey='id'
							pagination={{
								pageSize: 10,
							}}
							expandable={{
								expandedRowRender,
								rowExpandable: () => true,
							}}
						/>
					</Card>
				</Col>

				<Col span={8}>
					<Space direction='vertical' size={16} style={{ width: '100%' }}>
						<Card
							title={
								<span>
									<PieChartOutlined style={{ color: '#4F8BFF' }} /> Столбчатая
									диаграмма
								</span>
							}
						>
							<div
								style={{
									display: 'flex',
									gap: 12,
									height: 100,
									alignItems: 'flex-end',
								}}
							>
								{weeksData.map((week, i) => (
									<div
										key={i}
										style={{
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 4,
										}}
									>
										<div
											style={{
												display: 'flex',
												gap: 4,
												justifyContent: 'center',
												width: '100%',
											}}
										>
											<div
												style={{
													width: 12,
													backgroundColor: '#4F8BFF',
													borderRadius: '4px 4px 0 0',
													height: `${week.plan * 60}px`,
													minHeight: '2px',
												}}
											/>
											<div
												style={{
													width: 12,
													backgroundColor: '#10b981',
													borderRadius: '4px 4px 0 0',
													height: `${week.actual * 60}px`,
													minHeight: '2px',
												}}
											/>
										</div>
										<div style={{ fontSize: 11, color: '#666' }}>
											{week.week}
										</div>
										<div style={{ fontSize: 10, color: '#999' }}>
											{week.date}
										</div>
									</div>
								))}
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									gap: 24,
									marginTop: 16,
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<div
										style={{
											width: 12,
											height: 12,
											background: '#4F8BFF',
											borderRadius: 2,
										}}
									/>
									<span>План</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<div
										style={{
											width: 12,
											height: 12,
											background: '#10b981',
											borderRadius: 2,
										}}
									/>
									<span>Факт</span>
								</div>
							</div>
						</Card>

						<Card title='Распределение по сотрудникам'>
							<Space direction='vertical' style={{ width: '100%' }} size={3}>
								{employeesData.map((emp) => (
									<div key={emp.id}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												marginBottom: 4,
											}}
										>
											<span style={{ fontSize: 13, color: '#666' }}>
												{emp.name.split(' ')[0]}{' '}
												{emp.name.split(' ')[1]?.[0]}.
											</span>
											<span
												style={{
													fontSize: 13,
													fontWeight: 'bold',
													color: '#4F8BFF',
												}}
											>
												{emp.actual} FTE
											</span>
										</div>
										<Progress
											percent={Number(
												((emp.actual / totalFte) * 100).toFixed(0)
											)}
											showInfo={false}
											strokeColor='#4F8BFF'
											size='small'
										/>
									</div>
								))}
							</Space>
						</Card>
					</Space>
				</Col>
			</Row>
		</div>
	);
}
