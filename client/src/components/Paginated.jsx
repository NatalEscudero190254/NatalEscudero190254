import React from 'react';
import "./Paginated.css";



export default function Paginated({countriesPerPage, allCountries, paginated}){
    const pageNumbers = [];
    

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage) ; i++) {
        pageNumbers.push(i);
    };

    return (
        <nav className='pag'>
            <ul className='pagination'>
                {
                pageNumbers && pageNumbers.map((number) => {
                    return(
                        <li key={number}>
                            <a href='#' onClick={() => paginated(number)}>{number}</a>
                        </li>
                    )
                })
                }
            </ul>
                
            
        </nav>
    )


}