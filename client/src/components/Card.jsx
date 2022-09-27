import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css"



export default function Card({flagImg, name, continent,id}){
    return(
        <div className='carddiv'>
            <img className='img' src={flagImg} alt="Uups... img not found" />
            <h1 className='name'>{name}</h1>
            <p className='cont'>{continent}</p>
            
            
        </div>
    )

}