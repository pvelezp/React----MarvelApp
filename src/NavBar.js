import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton } from '@material-ui/core';
import{useHistory }from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {

    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-sm navbar-dark sticky-top">
          <div className="navbar__top">
          <Link
            className="navbar-brand"
            to='/'
            >
            <h1
            className="navbar__brandTitle"
            >Marvel Universe</h1>
            </Link>
            
           <div className="navbar__favoritesIcon">
           <IconButton
           
           onClick={() => history.push('/favorites')}
           >
           <FavoriteBorderIcon
           className="navbar__favoritesButton"
           />
           </IconButton>
           </div>

          </div>
            <div className="navbar-collapse">
            <div className="navbar-nav ">
                <NavLink
                activeClassName="active"
                className="nav-item nav-link "
              
                to='/characters'>Characters
                </NavLink>

                <NavLink
                 activeClassName="active"
                 className="nav-item nav-link"
                to='/comics'>Comics
                </NavLink>

                <NavLink 
                 activeClassName="active"
                 className="nav-item nav-link"
                to='/stories'>Stories</NavLink>
            </div>
            </div>
        </nav>
    )
}

export default NavBar
