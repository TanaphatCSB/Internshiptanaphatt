// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { BrowserRouter } from 'react-router-dom';
// import { UserProvider } from './Components/userContext';
// import { AdminProvider } from './Components/adminContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  
 
// <AdminProvider> 
// <UserProvider>
//  <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   </UserProvider>
//   </AdminProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Components/userContext';
import { AdminProvider } from './Components/adminContext';
import { NotificationProvider } from './Components/notificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
    <AdminProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AdminProvider>
    </NotificationProvider>
  </React.StrictMode>
);

reportWebVitals();
