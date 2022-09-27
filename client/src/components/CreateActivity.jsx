import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { getActivities, postActivity } from '../actions';
import {useDispatch, useSelector} from "react-redux";
import "./CreateActivity.css";


function validate(input){   
    let errors = {};
    if (!input.name){
        errors.name = 'an activity is required to be entered'
    }else if (!input.difficulty) {
        errors.difficulty = 'an difficulty is required to be entered'
       
    }else if (!input.duration) {
        errors.duration = 'an duration is required to be entered'
       
    }else if (!input.temporada) {
        errors.season = 'an season is required to be entered'
    }
    return errors;
}

export default function ActivitiesCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.allCountries)
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty:"", 
        duration: "",
        season: "", 
        countriesId: [],
    });
    
    function handleChange(el){
    
        
        setInput({
            ...input,
            [el.target.name]: el.target.value
        })
        setErrors(validate({
            ...input,
            [el.target.name]: el.target.value
        }
        ));
        console.log(input)
    }
    function handleCheck(el){
        if (el.target.checked){
            
            setInput({
                ...input,
                [el.target.name]:el.target.value
                
            })
            setErrors(validate({
                ...input,
                [el.target.name]: el.target.value
            }
            ));
        }
    }
    function handleSelec(el){
         const country = countries.find(c=>c.name === el.target.value)
        
          setInput({
            ...input,
            countriesId: [...input.countriesId, country]
        })
    }

    function handleSumit(el){
        el.preventDefault();
        console.log(input)
        dispatch(postActivity(input))
        alert("Activity Created")
        setInput({
            name: "",
            difficulty:[], 
            duration: "",
            season: []
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input, // se trae el estado anterior
            countriesId: input.countriesId.filter(occ => occ !== el)
        })
    }

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch]);

    return (
        <div className="container2">
            <div className="datos">
                <h1>Create your activity!</h1>

                <form onSubmit={(el)=>handleSumit(el)}>
                    <div >
                        <label className="label">Activity: </label>
                        <input
                        type = "text"
                        required
                        value= {input.name}
                        name= "name"
                        onChange={(el)=>handleChange(el)}
                        />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                            )}
                    </div>
                    <div>
                        <label className="label">Difficulty: </label>
                        <label><input
                        type = "radio"
                        required
                        name= "difficulty"
                        value= "1"
                        onChange={(el)=>handleCheck(el)}
                        />1</label>   
                        <label><input
                        type = "radio"
                        name= "difficulty"
                        value= "2"
                        onChange={(el)=>handleCheck(el)}
                        />2</label>   
                        <label><input
                        type = "radio"
                        name= "difficulty"
                        value= "3"
                        onChange={(el)=>handleCheck(el)}
                        />3</label>
                        <label><input
                        type = "radio"
                        name= "difficulty"
                        value= "4"
                        onChange={(el)=>handleCheck(el)}
                        />4</label>     
                        <label><input
                        type = "radio"
                        name= "difficulty"
                        value= "5"
                        onChange={(el)=>handleCheck(el)}
                        />5</label>
                        {errors.difficulty && (
                            <p className="error">{errors.difficulty}</p>
                            )}     
                    </div>
                    <div className="dur1">
                        <label className="label">Duration: </label>
                        <input
                        type = "number"
                        required
                        min="1"
                        max="90"
                        value= {input.duration}
                        name= "duration"
                        onChange={(el)=>handleChange(el)}
                        />
                        {errors.duration && (
                            <p className="error">{errors.duration}</p>
                        )} 
                    </div>
                    <div className="tem1">
                        <label className="label">Season: </label>
                        <label><input
                        type = "radio"
                        required
                        name= "season"
                        value= "Verano"
                        onChange={(el)=>handleCheck(el)}
                        />Verano</label>          
                        <label><input
                        type = "radio"
                        name= "season"
                        value= "Otoño"
                        onChange={(el)=>handleCheck(el)}  
                        />Otoño</label>  
                        <label><input
                        type = "radio"
                        name= "season"
                        value= "Invierno"
                        onChange={(el)=>handleCheck(el)}
                        />Invierno</label> 
                        <label><input
                        type = "radio"
                        name= "season"
                        value= "Primavera"
                        onChange={(el)=>handleCheck(el)}
                        />Primavera</label>
                        {errors.season && (
                            <p className="error">{errors.season}</p>
                            )} 
                    </div>




                
                    

                </form>
               <div >

                        <select onChange={(el)=>handleSelec(el)}required>
                        <option value = '' > Country</option>
                            {countries.map((count)=>(
                                
                                <option value={count.name}>{count.name}</option>
                            ))}
                        </select>
                    <div >
                        {input.countriesId.map(el=> 
                            <div >
                                <p>{el.name}</p>
                                <img className="countryselected" src={el.flagImg} alt="" />
                                
                                <button onClick={() => handleDelete(el)}>X</button>
                                </div>
                            )}
                    </div>
                        <button className="btncreate">Create!</button>       
               </div>
            </div>

            </div>

)}

