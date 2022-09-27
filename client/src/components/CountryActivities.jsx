import React from 'react';


export default function CountryActivities({name, difficulty, duration, season}){
    return(
        <div>
            {/* <h3>Activities</h3> */}
            <p><b>Name: </b>{name}</p>
            <p><b>Difficulty: </b>{difficulty}</p>
            <p><b>Duration: </b>{duration}</p>
            <p><b>Season: </b>{season}</p>
            
            
        </div>
    )
}