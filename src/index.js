import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {compose, createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import BurgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from'./store/reducers/order'
import authReducer from'./store/reducers/auth'

// const logger= store=>{
//     return next=>{
//         return action=>{
//             console.log('[MIDDLEWARE]',action);

//             const result=next(action);
//             console.log('[MIDDLEWARE]',store.getState())
//             return result;

//         }
//     }
// }

const rootReducer=combineReducers({
    burgerBuilder:BurgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
})
const composeEhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store=createStore(rootReducer,composeEhancer( applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
    </Provider>

, document.getElementById('root'));
registerServiceWorker();
