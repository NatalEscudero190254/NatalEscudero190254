import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {getCountryByName} from '../actions';
import "./Searchbar.css";



export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: ""
    });

    function validate(input){
        let errors = {}
        if(!input.name){
            errors.name = "Write a country!"
        }
        return errors;
    }
   
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountryByName(name))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...name,
            [e.target.name]: e.target.value
        }))
        setName("");
        
        // setCurrentPage(1)
        
    }
    
    return(
        <div className='searchdiv1'>
            <input  value={name} className='searchbar' type="text" placeholder='Search your country' onChange={(e) => handleInputChange(e)}/>
            <button className='searchbtn' type='submit' onClick={(e) => handleSubmit(e)}  >Search Country</button>
        </div>
    )
}