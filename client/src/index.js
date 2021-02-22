import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import { CookiesProvider } from 'react-cookie'

import {createStore , applyMiddleware , compose} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App.js'
import reducers from './reducers'


import axios from 'axios'
window.axios = axios

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore( reducers, composeEnhancers(applyMiddleware(reduxThunk)))

ReactDOM.render(
<Provider store={store}>
  <CookiesProvider>
    <App/>
    </CookiesProvider>
</Provider>
     , document.querySelector('#root') )





// CookieProvider for cookies
