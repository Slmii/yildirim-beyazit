import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { inject } from '@vercel/analytics';

import 'lib/i18n';
import './index.css';

inject();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
