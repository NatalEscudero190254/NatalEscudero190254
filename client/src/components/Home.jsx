import React from 'react';
import  {getCountries, filteredCountriesByContinent, filteredCountriesByPopulation, filteredCountriesByAlphabeticOrder, filterActivity, }  from '../actions';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from './Card';
import Paginated from './Paginated';
import { Link } from 'react-router-dom';
import "./Home.css"
import Navbar from './Navbar';
const ITEMS_PAGINA = 10;



export default function Home(){
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities)
    const [orden, setOrden] = useState("");
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(ITEMS_PAGINA);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry ) 
    
    const paginated = (pageNumber) => {
        if(pageNumber === 1){
            setCountriesPerPage(9)
        }else{
            setCountriesPerPage(10)
            setCurrentPage(pageNumber)
        }
    }
    
    
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

   
    const handleClickFilterByContinent = (e) => {
        e.preventDefault();
        dispatch(filteredCountriesByContinent(e.target.value))
        setCurrentPage(1);
    }

    const handleClickFilterByPopulation = (e) => {
        e.preventDefault();
        dispatch(filteredCountriesByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`orden${e.target.value}`)
        

    }
    
    const handleClickFilterByAlphabeticOrder = (e) => {
        e.preventDefault();
        dispatch(filteredCountriesByAlphabeticOrder(e.target.value))
        setCurrentPage(1)
        setOrder(`orden${e.target.value}`)
        

    }
    function handleFilterByActivity (el){
        el.preventDefault();
        dispatch(filterActivity(el.target.value))    
        setCurrentPage(1);
        };
    
    return (
        <React.Fragment>

            
            
           
            
            <div className='filters'>
                <div >
                    <select className='continents' onChange={(e) => handleClickFilterByContinent(e)}>
                        <option className='continents' value="" selected="defaultValue" disabled>Continent</option>
                        <option className='continents' value={"All"}>All</option>
                        <option className='continents' value={"South America"}>South America</option>
                        <option className='continents' value={"Europe"}>Europe</option>
                        <option className='continents' value={"North America"}>North America</option>
                        <option className='continents' value={"Asia"}>Asia</option>
                        <option className='continents' value={"Africa"}>Africa</option>
                        <option className='continents' value={"Oceania"}>Oceania</option>
                    </select>
                </div>
                <div >
                    <select className='activity' onChange={(el)=>handleFilterByActivity(el)} >
                    
                        <option className='activity' value = 'sin filtro'>Activities</option>
                            {activities.map((act)=>(
                        <option className='activity' value={act.name}>{act.name}</option>
                        ))}
                    
                    </select>
                </div>
                <div>
                    <select className='alphabet' onChange={(e) => handleClickFilterByAlphabeticOrder(e)}>
                        <option className='alphabet' selected="defaultValue" disabled>alphabetical order</option>
                        <option className='alphabet'value={"a"}>A-Z</option>
                        <option className='alphabet'value={"z"}>Z-A</option>
                    </select>
                </div>
                <div >
                    <select className='population' onChange={(e) => handleClickFilterByPopulation(e)}>
                        <option className='population' selected="defaultValue" disabled>Population</option>
                        <option className='population' value={"max"}>Max population</option>
                        <option className='population' value={"min"}>Min population</option>
                    </select>
                </div>
            </div>

            <div className='paginado'>

                <Paginated  allCountries={allCountries.length} countriesPerPage={ITEMS_PAGINA} paginated={paginated}/>
            </div>
            <div className='cards'>

                {
                    currentCountries?.map((e) =>{
                        return(
                            <React.Fragment>
                                <Link to={`/countries/${e.id}`}>
                                        <Card name={e.name} flagImg={e.flagImg? e.flagImg : <img src={'https://tse4.mm.bing.net/th?id=OIP.zzuvv5lPD1tyCAlbP0iokwHaEK&pid=Api&P=0'}/> } continent={e.continent} id={e.id} />
                                           
                                </Link>
                                    
                                        
                                
                            </React.Fragment>
                            )
                        })
                    }
                    


            </div>
           


            
            


        </React.Fragment>
        )

}

// const indexOfLastCountry = currentPage === 1 ? 9 : currentPage * countriesPerPage - 1; // 10

//const indexOfFirstCountry = currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage; // 0