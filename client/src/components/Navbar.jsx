import React from 'react';
import {getCountries} from '../actions';
import { useDispatch } from 'react-redux';
import SearchBar from './Searchbar';
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar(){
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCountries());
    }
    return(
        <div className='nav'>
            <div >
                <Link to={"/home"}>
                    <button className='homebtn'>Home</button>
                </Link>
            </div>
            <div>
                <button onClick={(e) => handleClick(e)} className="btn2">Refresh Countries</button>
            </div>
            <div className='searchbar'>
                <SearchBar ></SearchBar>
            </div>
            <div className='activities'>

                <Link to={"/activities"}>
                    <button className='btn3'>Create Activity</button>
                </Link>
            </div>
        
        </div>
        )
}