import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ChatProvider } from './context/ChatContext'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </StrictMode>
)
