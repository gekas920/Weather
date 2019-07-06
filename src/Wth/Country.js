import React from 'react'




function City({city,pic}) {
    if(pic){
        return (
            <div>
                <h1>Weather in {city}</h1>
                <img src={pic} alt="weather"/>
            </div>
        )
    }
    else {
        return(
            <div>
                <h1>Weather in {city}</h1>
            </div>

        )
    }
}


export default City