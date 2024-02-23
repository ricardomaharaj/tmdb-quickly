import { createRoot } from 'react-dom/client'
import { App } from '~/App'
import '~/tw.css'

createRoot(document.querySelector('#root')!).render(<App />)
