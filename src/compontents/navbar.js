import React from 'react';
import './navbar.css';
function Navbar() {
    return( <div>
        <ul className="nav nav-pills">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="/analyse" >analyse</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/Home" >Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/diary" >diary</a>
  </li>
  
  
</ul>
    </div>);
}

export default Navbar;
