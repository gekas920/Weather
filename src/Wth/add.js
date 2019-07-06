import React from 'react'


function Add({onClick}) {
    return(
        <div className="close" onClick={onClick}><img className="plus" src={"https://api.icons8.com/download/6b2011b3e85330834529d388bf8b56ef7e6c42e6/Android_L/PNG/512/Very_Basic/plus-512.png"} alt=""/></div>
    )
}


export default Add;