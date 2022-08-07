import React from "react";
import { Link } from "react-router-dom";
import "./HeaderComponent.css"

export default function HeaderComponent() {
    return (
    <div className="headerComponent">
        <div className="heading">Space-X
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <div className="links">
      <Link className="title" to="">History</Link>
      <Link className="title" to="launches">Launches</Link>
      <Link className="title" to="rockets">Rockets</Link>
        </div>  
    </div>
    )
}