import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import AppLogin from './containers/AppLogin'
import App from './containers/App'
import store from './store/configureStore'
import './index.css'
import './assets/fontawesome/css/font-awesome.min.css'


const app = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppLogin} />
            <Route path="/logged" component={App} />
        </Router>
    </Provider>, app
)