import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import SingleComiPage from './components/pages/SingleComicPage';
import './style/style.scss';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render( <React.StrictMode >
    <App/>
    </React.StrictMode>,
  )

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );