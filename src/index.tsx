import './index.css'

import createHistory from "history/createBrowserHistory"
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { Router } from "react-router"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

import App from './App'
import * as reducers from './ducks'
import { loadUserInitialData } from './ducks/Users'
import registerServiceWorker from './registerServiceWorker'
import services from './services';

const loadInitialData = () => store.dispatch(loadUserInitialData())

const history = createHistory()

const store = createStore(combineReducers({
  ...reducers,
  form: formReducer, 
}), applyMiddleware(thunk.withExtraArgument(services)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App loadInitialData={loadInitialData} history={history} />
    </Router>
  </Provider>
  ,document.getElementById('root') as HTMLElement
)
registerServiceWorker()
