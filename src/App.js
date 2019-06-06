import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Data from './components/Data'
import StationPage from './components/StationPage'
import Home from './components/Home'
import Header from './components/Header'
import WeatherBar from './components/WeatherBar'

import avgErcBi from './data/avgErcBi'

import { getArchive, makeReq, getLatest, getForecast, getNwsForecast, assignAvgAllYears } from './actions'

const routes = [

	{ path: '/data',
		component: Data,
		exact: true
	},
	{ path: '/420913',
		component: StationPage,
		exact: true
	},
	{ path: '/420916',
		component: StationPage,
		exact: true
	},
	{ path: '/420917',
		component: StationPage,
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
		this.props.getForecast()
		this.props.getNwsForecast()
		if(this.props.archiveData){
			console.log(this.props.archiveData)
		}
		console.log(this, 'thisapp')
		// dispatch(makeReq())
	}
	componentDidUpdate(prevProps){
		if(prevProps.archiveData !== this.props.archiveData){

			this.props.assignAvgAllYears(this.props.archiveData, avgErcBi)
			// console.log('app did update', this, prevProps)
		}
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




export default connect(mapStateToProps, { getArchive, makeReq, getLatest, getForecast, getNwsForecast, assignAvgAllYears } )(App)
