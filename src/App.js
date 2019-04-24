import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Data from './components/Data'
import Home from './components/Home'
import Header from './components/Header'
import WeatherBar from './components/WeatherBar'

import { getArchive, makeReq, getLatest } from './actions'

const routes = [

	{ path: '/data',
		component: Data,
		exact: true
	},
	{ 
		component: Home
	},
	{
		path: '/',
		component: Home
	}
]

const RouteWithSubRoutes = route => (
	<Route 
		path={route.path}
		render={props => (
			<route.component {...props} routes={route.routes} />
		)}
	/>
)


class App extends Component {
	componentDidMount(){
		this.props.getArchive()
		this.props.makeReq()
		this.props.getLatest()
		// console.log(this, 'thisapp')
		// dispatch(makeReq())
	}
  render() {
    return (
      <div className="h-100">
       <Header />
       <WeatherBar />
       <Switch>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}




export default connect(mapStateToProps, { getArchive, makeReq, getLatest } )(App)
