import { LogOut } from 'lucide-react';
import type React from 'react';
import { useAuthUser } from './use-auth-user';

interface AuthUserProps {
	isCollapsed?: boolean;
}

export const AuthUser: React.FC<AuthUserProps> = ({ isCollapsed = false }) => {
	const { user, handleLogout } = useAuthUser();

	if (!user?.email) {
		return (
			<div
				style={{
					padding: '11px',
					margin: '31px',
					background: '333333',
					borderRadius: '8px',
				}}
			>
				<p style={{ fontSize: '12px', color: 'FFFFFF' }}>Нет данных пользователя</p>
				<button
					onClick={() => {
						localStorage.setItem(
							'auth',
							JSON.stringify({
								email: 'kudrmatvey@gmail.com',
								name: 'Кудрявцев Матвей',
							})
						);
						window.location.reload();
					}}
					style={{ fontSize: '12px', padding: '5px 10px', cursor: 'pointer' }}
				>
					Добавить пользователя
				</button>
			</div>
		);
	}

	const firstName = user.name?.split(' ')[0] || '';
	const lastName = user.name?.split(' ')[1] || '';

	if (isCollapsed) {
		return (
			<div className='flex justify-center p-0'>
				<img
					src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff&rounded=true`}
					alt={user.name}
					className='w-12 h-28 rounded-full cursor-pointer'
					onClick={handleLogout}
					title='Выйти'
				/>
			</div>
		);
	}

	return (
		<div className='flex items-center justify-between gap-4 p-4 333333 rounded-lg border border-gray-200 w-full mb-4'>
			<div className='flex items-center gap-2'>
				<img
					src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff&rounded=true`}
					alt={user.name}
					className='w-12 h-12 rounded-full'
				/>
				<div>
					<div className='font-medium text-white'>
						{firstName} {lastName}
					</div>
					<div className='text-xs text-gray-500'>{user.email}</div>
				</div>
			</div>
			<button
				onClick={handleLogout}
				className='p-2 text-gray-400 hover:text-white hover:white rounded-lg transition-colors'
			>
				<LogOut size={22} />
			</button>
		</div>
	);
};
