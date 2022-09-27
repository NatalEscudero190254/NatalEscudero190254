import React from 'react';
import { Link } from 'react-router-dom';
import  "./LandingPage.css" ;


export default function LandingPage(){
    return (
            <header>
                <div className='Landing'>
                    {/* <h1 className='tittle'>Country App</h1> */}
                    <h1 className='parraf'>Join us to discover the world</h1>
                    <Link to={"/home"}>
                    <button className='btn'>Get Started</button>
                    </Link>
                </div>
            </header>
        )
}