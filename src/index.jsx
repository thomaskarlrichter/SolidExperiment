import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SessionProvider } from "@inrupt/solid-ui-react";


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <SessionProvider sessionId="log-in-example">
		<App />
      </SessionProvider>
	</React.StrictMode>
)