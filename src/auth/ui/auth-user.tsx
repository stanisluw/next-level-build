import { CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import type React from 'react';
import { useAuthUser } from './use-auth-user';

const { Text, Title } = Typography;

interface AuthUserProps {
	isCollapsed?: boolean;
}

export const AuthUser: React.FC<AuthUserProps> = ({ isCollapsed = false }) => {
	const { user, handleLogout } = useAuthUser();

	const handleAddUser = () => {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				email: 'kudrmatvey@gmail.com',
				name: 'Кудрявцев Матвей',
			})
		);
		window.location.reload();
	};

	if (!user?.email) {
		return (
			<Card
				style={{
					background: '#333333',
					borderRadius: 8,
					margin: 16,
				}}
				bodyStyle={{ padding: 11 }}
			>
				<Space direction='vertical' size={8} style={{ width: '100%', textAlign: 'center' }}>
					<Text style={{ color: '#ffffff', fontSize: 12 }}>Нет данных пользователя</Text>
					<Button type='primary' size='small' onClick={handleAddUser}>
						Добавить пользователя
					</Button>
				</Space>
			</Card>
		);
	}

	const firstName = user.name?.split(' ')[0] || '';
	const lastName = user.name?.split(' ')[1] || '';

	if (isCollapsed) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 38px 0' }}>
				<Avatar
					size={48}
					src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F8BFF&color=fff&rounded=true`}
					style={{ cursor: 'pointer', width: 55, height: 55 }}
					onClick={handleLogout}
					alt={user.name}
				/>
			</div>
		);
	}

	return (
		<Card
			style={{
				background: '#333333',
				borderRadius: 8,
				border: '1px solid #e5e7eb',
				marginBottom: 16,
			}}
			bodyStyle={{ padding: 16 }}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 16,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<Avatar
						size={55}
						src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F8BFF&color=fff&rounded=true`}
						alt={user.name}
					/>
					<div>
						<Title level={5} style={{ margin: 0, color: '#ffffff' }}>
							{firstName} {lastName}
						</Title>
						<Text type='secondary' style={{ fontSize: 12, color: '#9ca3af' }}>
							{user.email}
						</Text>
					</div>
				</div>
				<Button
					type='text'
					icon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
					onClick={handleLogout}
					style={{ color: '#9ca3af' }}
				/>
			</div>
		</Card>
	);
};
