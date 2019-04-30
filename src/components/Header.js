import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'

export function Header(){
	return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			 <h1 className="navbar-brand">Dugway Fire Decision Tool</h1>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
			      </li>
			    </ul>
			  </div>
			</nav>
		)
}



export default Header