import createHistory from 'history/createBrowserHistory'
import { identity } from "lodash";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

const history = createHistory()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App loadInitialData={ identity } history={history} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
