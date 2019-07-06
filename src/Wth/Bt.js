import React from 'react'
import './Wth.css'
function Button({props,name,onClick,Del}) {
    return(
        <div className="hv">
            <button className="button" onClick={onClick} id={name}
            >{props}</button>
            <unadd onClick={Del}>x</unadd>
        </div>
    )
}



export default Button
