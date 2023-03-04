import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import { store } from 'store/store'
import { App } from './App'

import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faR, faS, fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(faS, fas, far, faR)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
