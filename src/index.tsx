import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import RouteTree from './routes/RouteTree'
import axiosConfig from './networking/axiosConfig'

axiosConfig()
ReactDOM.render(
    <React.StrictMode>
        <RouteTree />
    </React.StrictMode>,
    document.getElementById('root')
)

// TODO: This is a test for sonar scan

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
