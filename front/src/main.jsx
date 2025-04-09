import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from './utils/context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <Provider> 
      <App />
    </Provider>
        
     </BrowserRouter>
  
  </StrictMode>
)
