import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import 'virtual:uno.css'

import store from '@/store'
import App from '@/App'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
