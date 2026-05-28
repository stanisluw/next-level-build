import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Row, Space, Tag } from 'antd';
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const employeesData: Record<number, any> = {
	1: {
		id: 1,
		name: 'Кудрявцев М.С.',
		position: 'Руководитель проектов',
		experience: '15 лет',
		planHours: 14,
		actualHours: 12,
		completionRate: 86,
		monthlyData: {
			labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
			plan: [14, 14, 14, 14, 14, 14],
			actual: [12, 13, 14, 11, 15, 13],
		},
		tasksData: {
			labels: ['Выполнено', 'В работе', 'Просрочено'],
			data: [85, 10, 5],
			colors: ['#10b981', '#f59e0b', '#ef4444'],
		},
	},
	2: {
		id: 2,
		name: 'Соловьева В.А.',
		position: 'Инженер строительного контроля',
		experience: '20 лет',
		planHours: 18,
		actualHours: 16,
		completionRate: 89,
		monthlyData: {
			labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
			plan: [18, 18, 18, 18, 18, 18],
			actual: [15, 16, 17, 16, 18, 16],
		},
		tasksData: {
			labels: ['Выполнено', 'В работе', 'Просрочено'],
			data: [89, 8, 3],
			colors: ['#10b981', '#f59e0b', '#ef4444'],
		},
	},
	3: {
		id: 3,
		name: 'Минаев А.О.',
		position: 'Специалист по снабжению',
		experience: '8 лет',
		planHours: 20,
		actualHours: 18,
		completionRate: 90,
		monthlyData: {
			labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
			plan: [20, 20, 20, 20, 20, 20],
			actual: [16, 18, 19, 18, 20, 18],
		},
		tasksData: {
			labels: ['Выполнено', 'В работе', 'Просрочено'],
			data: [90, 7, 3],
			colors: ['#10b981', '#f59e0b', '#ef4444'],
		},
	},
	4: {
		id: 4,
		name: 'Маслов Ю.Т.',
		position: 'Архитектор-дизайнер',
		experience: '10 лет',
		planHours: 12,
		actualHours: 11,
		completionRate: 92,
		monthlyData: {
			labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
			plan: [12, 12, 12, 12, 12, 12],
			actual: [10, 11, 12, 11, 12, 11],
		},
		tasksData: {
			labels: ['Выполнено', 'В работе', 'Просрочено'],
			data: [92, 5, 3],
			colors: ['#10b981', '#f59e0b', '#ef4444'],
		},
	},
	5: {
		id: 5,
		name: 'Севастьянова А.М.',
		position: 'Инженер-экономист',
		experience: '12 лет',
		planHours: 16,
		actualHours: 14,
		completionRate: 88,
		monthlyData: {
			labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
			plan: [16, 16, 16, 16, 16, 16],
			actual: [13, 14, 15, 14, 16, 14],
		},
		tasksData: {
			labels: ['Выполнено', 'В работе', 'Просрочено'],
			data: [88, 9, 3],
			colors: ['#10b981', '#f59e0b', '#ef4444'],
		},
	},
};

export default function EmployeePage() {
	const { employeeId } = useParams();
	const navigate = useNavigate();
	const employee = employeesData[Number(employeeId)];

	if (!employee) {
		return (
			<div style={{ padding: 24 }}>
				<Button
					type='link'
					onClick={() => navigate('/employees')}
					style={{ paddingLeft: 0 }}
				>
					<ArrowLeftOutlined /> Назад
				</Button>
				<Card>
					<h1>Сотрудник не найден</h1>
				</Card>
			</div>
		);
	}

	const lineChartData = {
		labels: employee.monthlyData.labels,
		datasets: [
			{
				label: 'План',
				data: employee.monthlyData.plan,
				borderColor: '#4F8BFF',
				backgroundColor: 'rgba(79, 139, 255, 0.1)',
				tension: 0.4,
			},
			{
				label: 'Факт',
				data: employee.monthlyData.actual,
				borderColor: '#10b981',
				backgroundColor: 'rgba(16, 185, 129, 0.1)',
				tension: 0.4,
			},
		],
	};

	const barChartData = {
		labels: employee.monthlyData.labels,
		datasets: [
			{ label: 'План', data: employee.monthlyData.plan, backgroundColor: '#4F8BFF' },
			{ label: 'Факт', data: employee.monthlyData.actual, backgroundColor: '#10b981' },
		],
	};

	const pieChartData = {
		labels: employee.tasksData.labels,
		datasets: [
			{
				data: employee.tasksData.data,
				backgroundColor: employee.tasksData.colors,
				borderWidth: 0,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { position: 'bottom' as const } },
	};

	return (
		<div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
			<Button
				type='link'
				onClick={() => navigate('/employees')}
				style={{ paddingLeft: 0, marginBottom: 16 }}
			>
				Назад
			</Button>

			<Card style={{ marginBottom: 24 }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<Avatar
						size={48}
						style={{
							backgroundColor: '#4F8BFF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 20,
						}}
					>
						{employee.name.charAt(0)}
					</Avatar>
					<div>
						<h1 style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>
							{employee.name}
						</h1>
						<p style={{ color: '#6b7280', margin: '4px 0', fontSize: 12 }}>
							{employee.position}
						</p>
						<Space size={12} wrap>
							<Tag>{employee.experience}</Tag>
							<Tag color='blue'>План: {employee.planHours}ч</Tag>
							<Tag color='green'>Факт: {employee.actualHours}ч</Tag>
						</Space>
					</div>
				</div>
			</Card>

			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card title='Динамика нагрузки' size='small' style={{ height: '100%' }}>
						<div style={{ height: 220 }}>
							<Line data={lineChartData} options={options} />
						</div>
					</Card>
				</Col>

				<Col xs={24} lg={12}>
					<Card title='Выполнение задач' size='small' style={{ height: '100%' }}>
						<div style={{ height: 220 }}>
							<Pie data={pieChartData} options={options} />
						</div>
					</Card>
				</Col>

				<Col xs={24}>
					<Card title='Сравнение план/факт' size='small'>
						<div style={{ height: 260 }}>
							<Bar data={barChartData} options={options} />
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
