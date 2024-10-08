import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className='text-6xl'>OnlyTasks</h1>
    <img src="/tasks.svg" alt="onlytasks" width={150} />
  </StrictMode>,
)
