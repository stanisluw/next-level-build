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

function EmployeePage() {
	const { employeeId } = useParams();
	const navigate = useNavigate();
	const employee = employeesData[Number(employeeId)];

	if (!employee) {
		return (
			<div className='p-4'>
				<button onClick={() => navigate('/employees')} className='text-primary'>
					← Назад
				</button>
				<h1 className='text-xl font-bold'>Сотрудник не найден</h1>
			</div>
		);
	}

	const lineChartData = {
		labels: employee.monthlyData.labels,
		datasets: [
			{
				label: 'План',
				data: employee.monthlyData.plan,
				borderColor: '#3b82f6',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
			{ label: 'План', data: employee.monthlyData.plan, backgroundColor: '#3b82f6' },
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
		<div className='p-6 bg-gray-50 min-h-screen'>
			<div className='mb-4 text-sm text-gray-500'>
				<span
					className='hover:text-primary cursor-pointer'
					onClick={() => navigate('/employees')}
				>
					Назад
				</span>
			</div>

			<div className='bg-white rounded-lg shadow-sm border p-3 mb-4'>
				<div className='flex items-center gap-3'>
					<div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold'>
						{employee.name.charAt(0)}
					</div>
					<div>
						<h1 className='text-lg font-bold'>{employee.name}</h1>
						<p className='text-xs text-gray-500'>{employee.position}</p>
						<div className='flex gap-3 mt-1 text-xs'>
							<span>{employee.experience}</span>
							<span className='text-primary'>План: {employee.planHours}ч</span>
							<span className='text-green-600'>Факт: {employee.actualHours}ч</span>
							<span className='text-emerald-600'>✅ {employee.completionRate}%</span>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				<div className='bg-white rounded-lg shadow-sm border p-2'>
					<h3 className='text-sm font-semibold mb-2'>Динамика нагрузки</h3>
					<div style={{ height: 180 }}>
						<Line data={lineChartData} options={options} />
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm border p-2'>
					<h3 className='text-sm font-semibold mb-2'>Выполнение задач</h3>
					<div style={{ height: 180 }}>
						<Pie data={pieChartData} options={options} />
					</div>
				</div>

				<div className='md:col-span-2 bg-white rounded-lg shadow-sm border p-2'>
					<h3 className='text-sm font-semibold mb-2'>Сравнение план/факт</h3>
					<div style={{ height: 200 }}>
						<Bar data={barChartData} options={options} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeePage;
