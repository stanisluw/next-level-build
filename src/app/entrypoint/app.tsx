import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from '#app/router';
import { store } from '#app/store';
import { theme } from '#app/styles/ant';

function App() {
	return (
		<ConfigProvider theme={theme} locale={ru_RU}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ConfigProvider>
	);
}

export default App;
