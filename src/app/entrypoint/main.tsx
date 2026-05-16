import { createRoot } from 'react-dom/client';

import App from './app';

import 'antd/dist/reset.css';
import '#app/styles/tailwind.css';
import '#app/styles/globals.css';

createRoot(document.getElementById('root')!).render(<App />);
