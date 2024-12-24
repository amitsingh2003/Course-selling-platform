import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authprovider from './context/Authprovider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authprovider>
  <div className=" dark:bg-slate-900 dark:text-white">
    <App />
    </div>
    </Authprovider>
    </BrowserRouter>
 
)
