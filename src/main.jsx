import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './Store/PersistStore.js'
import { ThemeProvider } from "@material-tailwind/react";
// import './Store/InterceptorUrl.js'
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider>
        <App />
    </ThemeProvider>
      </Provider>
  </React.StrictMode>,
)
