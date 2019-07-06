import React from 'react'
import City from './Country'




function Container({city,pic}) {
    return(
        <container className = "container">
            <City city={city} pic={pic}/>
        </container>
    )
}

export default Container