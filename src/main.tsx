import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.tsx'
import { NextUIProvider } from '@nextui-org/react'

import './index.css'

createRoot(document.querySelector('#root')!).render(
  <NextUIProvider>
    <Provider store={setupStore}>
      <App />
    </Provider>
  </NextUIProvider>
)

