import * as React from 'react'
import { Link } from 'react-router-dom';

import { faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const style = {
    link: {
        color: '#555',
        textDecoration: 'none'
    } as React.CSSProperties,
    navbar: {
        borderBottom: 'solid 1px #aaa',
        padding: '10px 15px'
    } as React.CSSProperties,
}

export default class Navbar extends React.Component {
    
    public render() {
    
      return (
        <div style={ style.navbar }>
          <Link style={ style.link } to='/app/newsfeed'><FontAwesomeIcon icon={ faNewspaper } /> Instacool </Link>
          <div style={{ float: 'right'}}>
            <Link style={ style.link } to='/app/profile'><FontAwesomeIcon icon={ faUser } /> Profile </Link>
          </div>
        </div>
      )
    }
}