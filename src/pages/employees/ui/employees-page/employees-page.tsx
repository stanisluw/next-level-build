import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import type React from 'react';
import { useMemo, useState } from 'react';
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

const EmployeesTable: React.FC = () => {
	const navigate = useNavigate();
	const [data] = useState<Employee[]>(sampleEmployees);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const columns = useMemo<ColumnDef<Employee>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'ФИО',
				size: 350,
			},
			{
				accessorKey: 'position',
				header: 'Должность',
				size: 300,
			},
			{
				accessorKey: 'experience',
				header: 'Стаж',
				size: 120,
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, globalFilter },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: 10 } },
	});

	const handleRowClick = (employeeId: number) => {
		console.log('Переход к сотруднику:', employeeId);
		navigate(`/employees/${employeeId}`);
	};

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
					<input
						type='text'
						placeholder='Поиск'
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:primary'
					/>
				</div>
				<div className='text-sm text-gray-500'>Всего: {data.length} сотрудников</div>
			</div>

			<div className='border rounded-lg overflow-hidden shadow-sm'>
				<table className='w-full'>
					<thead className='bg-primary'>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										onClick={header.column.getToggleSortingHandler()}
										className='px-4 py-3 text-left text-sm font-semibold text-white cursor-pointer hover:bg-primary transition-colors'
										style={{ width: header.getSize() }}
									>
										<div className='flex items-center gap-1'>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getIsSorted() === 'asc' && (
												<ChevronUp className='w-4 h-4' />
											)}
											{header.column.getIsSorted() === 'desc' && (
												<ChevronDown className='w-4 h-4' />
											)}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row, idx) => (
							<tr
								key={row.id}
								onClick={() => handleRowClick(row.original.id)}
								className={`border-b hover:bg-blue-50 transition-colors cursor-pointer ${
									idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
								}`}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className='px-4 py-3 text-sm text-gray-700'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex justify-between items-center pt-2'>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-gray-600'>Строк на странице:</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => table.setPageSize(Number(e.target.value))}
						className='border border-gray-300 rounded-md px-2 py-1 text-sm'
					>
						{[1, 2, 3, 4, 5].map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
				<div className='flex gap-2'>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className='px-3 py-1 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50'
					>
						Назад
					</button>
					<span className='px-3 py-1 text-sm'>
						{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
					</span>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className='px-3 py-1 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50'
					>
						Вперед
					</button>
				</div>
			</div>
		</div>
	);
};

const EmployeesPage: React.FC = () => {
	return (
		<div className='p-6'>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold text-gray-800'>Сотрудники</h1>
				<p className='text-gray-500 mt-1'>Управление списком сотрудников компании</p>
			</div>
			<EmployeesTable />
		</div>
	);
};

export default EmployeesPage;
