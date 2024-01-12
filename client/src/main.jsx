
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={persistor} >
      <App />
  </Provider>
)
