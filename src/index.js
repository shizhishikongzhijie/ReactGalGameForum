import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"
import store from './store'
// import './index.css';
import './plugins/themify-icons/themify-icons.css'

import 'bootstrap/dist/js/bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
import './plugins/bootstrap-icons-1.11.2/font/bootstrap-icons.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick.js'
// import './css/style.css';
// import './css/style_night.css';
// import './css/style.css.map';
import './js/script'

import { Skeleton } from 'antd';
import App from './App';
import Admin from './admin/app' 
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < Provider store={store}>
      <Suspense fallback={<p style={{ marginTop: '6rem' }}><Skeleton active /></p>}>
      <Router>
        <Routes>
      {/* 如果是admin页面，则跳转到admin页面，否则都为App */}
        <Route path='/admin' element={<Admin />} />
        <Route path="/*" element={<App />} />
        </Routes>
      </Router>
      </Suspense>
    </Provider>
    {/* react-router-dom Link的实现正在调用useContext，而它正在寻找的上下文是由BrowserRouter（此处为Router）提供的。 */}
    {/* <App /> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
