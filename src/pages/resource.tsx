import { ChevronDown, ChevronUp, PieChart } from 'lucide-react';
import React, { useState } from 'react';
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
	const [expandedId, setExpandedId] = useState<number | null>(null);

	const totalFte = employeesData.reduce(
		(sum, emp) => sum + (periodMode === 'actual' ? emp.actual : emp.plan),
		0
	);

	const formatValue = (value: number) => {
		if (displayMode === 'fte') return `${value.toFixed(2)} FTE`;
		if (displayMode === 'percent') return `${(value * 100).toFixed(0)}%`;
		return `${Math.round(value * 160)}ч`;
	};

	return (
		<div className='p-6 bg-gray-50 min-h-screen'>
			<div className='mb-4 text-sm text-gray-500'>
				<span
					className='hover:text-primary cursor-pointer'
					onClick={() => navigate('/projects')}
				>
					Назад
				</span>
			</div>

			<div className='mb-6'>
				<h1 className='text-2xl font-bold text-gray-800'>Ресурсный учёт</h1>
				<p className='text-gray-500 text-sm mt-1'>Планирование ресурсов по сотрудникам</p>
			</div>

			<div className='bg-white rounded-lg shadow-sm border p-4 mb-6'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Выбор сотрудника
						</label>
						<select
							value={selectedEmployee}
							onChange={(e) => setSelectedEmployee(e.target.value)}
							className='w-full border border-gray-300 rounded-md px-3 py-2'
						>
							<option>Все</option>
							{employeesData.map((emp) => (
								<option key={emp.id}>{emp.name}</option>
							))}
						</select>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Период отображения
						</label>
						<select
							value={periodMode}
							onChange={(e) => setPeriodMode(e.target.value as 'plan' | 'actual')}
							className='w-full border border-gray-300 rounded-md px-3 py-2'
						>
							<option value='actual'>Факт</option>
							<option value='plan'>План</option>
						</select>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Режим отображения
						</label>
						<select
							value={displayMode}
							onChange={(e) =>
								setDisplayMode(e.target.value as 'fte' | 'percent' | 'hours')
							}
							className='w-full border border-gray-300 rounded-md px-3 py-2'
						>
							<option value='fte'>FTE</option>
							<option value='percent'>%</option>
							<option value='hours'>Часы</option>
						</select>
					</div>
					<div className='bg-blue-50 rounded-md p-3 text-center'>
						<p className='text-sm text-gray-500'>Общий FTE</p>
						<p className='text-2xl font-bold text-primary'>{totalFte.toFixed(2)} FTE</p>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2 bg-white rounded-lg shadow-sm border'>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead className='bg-gray-50 border-b'>
								<tr>
									<th className='px-4 py-3 w-8'></th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										№
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										ФИО
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										Статус
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										План
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										Факт
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										Часы
									</th>
									<th className='px-4 py-3 text-sm font-semibold text-gray-700'>
										Детали
									</th>
								</tr>
							</thead>
							<tbody>
								{employeesData.map((emp, idx) => (
									<React.Fragment key={emp.id}>
										<tr className='border-b hover:bg-gray-50'>
											<td className='px-4 py-3'>
												<button
													onClick={() =>
														setExpandedId(
															expandedId === emp.id ? null : emp.id
														)
													}
												>
													{expandedId === emp.id ? (
														<ChevronUp size={16} />
													) : (
														<ChevronDown size={16} />
													)}
												</button>
											</td>
											<td className='px-4 py-3'>{idx + 1}</td>
											<td className='px-4 py-3 font-medium'>{emp.name}</td>
											<td className='px-4 py-3'>
												<span
													className={`px-2 py-1 rounded-full text-xs font-medium ${emp.status === 'Активен' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
												>
													{emp.status}
												</span>
											</td>
											<td className='px-4 py-3 text-gray-500'>
												{formatValue(emp.plan)}
											</td>
											<td className='px-4 py-3 font-semibold text-primary'>
												{formatValue(emp.actual)}
											</td>
											<td className='px-4 py-3 text-gray-500'>
												{Math.round(emp.actual * 160)}ч
											</td>
											<td className='px-4 py-3 text-gray-400 text-sm'>
												подробнее
											</td>
										</tr>
										{expandedId === emp.id && (
											<tr className='bg-gray-50'>
												<td colSpan={8} className='px-4 py-4'>
													<div>
														<h4 className='font-medium text-gray-800 mb-3'>
															Распределение по неделям
														</h4>
														<div className='flex gap-4 h-32 items-end'>
															{weeksData.map((week, i) => (
																<div
																	key={i}
																	className='flex-1 flex flex-col items-center gap-0'
																>
																	<div className='text-xs text-gray-600 font-medium'>
																		{week.week}
																	</div>
																	<div
																		className='w-full bg-primary rounded-t transition-all'
																		style={{
																			height: `${week.actual * 100}px`,
																			minHeight: '4px',
																		}}
																	/>
																	<div className='text-sm font-semibold text-primary'>
																		{week.actual} FTE
																	</div>
																	<div className='text-xs text-gray-400'>
																		{week.date}
																	</div>
																</div>
															))}
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='bg-white rounded-lg shadow-sm border p-4'>
						<h3 className='text-md font-semibold text-gray-800 mb-3 flex items-center gap-2'>
							<PieChart size={18} /> Столбчатая диаграмма
						</h3>
						<div className='flex gap-3 h-48 items-end'>
							{weeksData.map((week, i) => (
								<div key={i} className='flex-1 flex flex-col items-center gap-2'>
									<div className='flex gap-1 w-full justify-center'>
										<div
											className='bg-primary rounded-t w-4'
											style={{
												height: `${week.plan * 80}px`,
												minHeight: '2px',
											}}
										/>
										<div
											className='bg-green-400 rounded-t w-4'
											style={{
												height: `${week.actual * 80}px`,
												minHeight: '2px',
											}}
										/>
									</div>
									<div className='text-xs text-gray-600 font-medium'>
										{week.week}
									</div>
									<div className='text-xs text-gray-400'>{week.date}</div>
								</div>
							))}
						</div>
						<div className='flex justify-center gap-4 mt-3 pt-2 border-t'>
							<div className='flex items-center gap-2'>
								<div className='w-3 h-3 bg-primary rounded'></div>
								<span className='text-sm text-gray-600'>План</span>
							</div>
							<div className='flex items-center gap-2'>
								<div className='w-3 h-3 bg-green-400 rounded'></div>
								<span className='text-sm text-gray-600'>Факт</span>
							</div>
						</div>
					</div>

					<div className='bg-white rounded-lg shadow-sm border p-4'>
						<h3 className='text-md font-semibold text-gray-800 mb-3'>
							Распределение по сотрудникам
						</h3>
						<div className='space-y-3'>
							{employeesData.map((emp) => (
								<div key={emp.id} className='flex items-center justify-between'>
									<span className='text-sm text-gray-700 w-32'>
										{emp.name.split(' ')[0]} {emp.name.split(' ')[1]?.[0]}.
									</span>
									<div className='flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden'>
										<div
											className='h-full bg-primary rounded-full'
											style={{ width: `${(emp.actual / totalFte) * 100}%` }}
										/>
									</div>
									<span className='text-sm font-semibold text-primary w-16 text-right'>
										{emp.actual} FTE
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
