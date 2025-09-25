import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/style.css"

import "bootstrap-icons/font/bootstrap-icons.css";
import {GoogleOAuthProvider} from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
      <Provider store={store}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
              </GoogleOAuthProvider>
      </Provider>
)


// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </StrictMode>,
// )
