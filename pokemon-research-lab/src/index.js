   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App'; // Ensure this points to your main App component
   import { Provider } from 'react-redux';
   import store from './store'; // Ensure this points to your Redux store

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   