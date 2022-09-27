import { React, useEffect }from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountryDetail, cleanUpDetail } from '../actions';
import { Link } from 'react-router-dom';
import CountryActivities from './CountryActivities';
import "./Detail.css";


export default function Detail(props){

    const dispatch = useDispatch();
    const id = props.match.params.id
    
    
    useEffect(() => {
        dispatch(getCountryDetail(id))
        
    }, [dispatch]);
    
    
    const detail = useSelector((state) => state.detail);
    
    useEffect(() => {
        return () =>{
            cleanUpDetail();
        }
    }, [])

   return (
        detail && detail.id
        ?(
                    <div className='detail'>

                <div className='container'>
                        <div className='propsdiv'>
                            <h1>{detail.name}</h1>
                            <img className='detailimg' src={detail.flagImg} alt="" />
                            <div className='containerinfo'>
                                <div>
                                    <p><b>Continent: </b></p>
                                    <p>{detail.continent}</p>
                                    <p><b>Capital: </b> </p>
                                    <p>{detail.capital}</p>
                                    <p><b>Subregion: </b></p>
                                    <p>{detail.subRegion}</p>
                                </div>
                                <div>
                                    <p><b>Area: </b></p>
                                    <p>{detail.area} km2</p>
                                    <p><b>Population: </b></p>
                                    <p>{detail.population}</p>
                                    <p><b>Id: </b></p>
                                    <p>{detail.id}</p>
                                </div>
                            </div>
                        </div>
                </div>
                    <div className="activitiesdiv"><b>Activities: </b>{

                        detail.activities.length > 0
                        ?(
                        detail.activities.map((e) => {
                            return(
                                <div>
                                    <CountryActivities name={e.name} difficulty={e.difficulty} duration={e.duration} season={e.season}/>
                                </div>
                                )
                        })
                        )
                        : <>
                            
                            <h4>Uups... this country doesn't have activities</h4>
                            <Link to={"/activities"}>
                                <button className='activitybtn'>Create one!</button>
                            </Link>
                        </>
                    }</div>
            
            </div>
            
            

        )
        : <h1> Loading...</h1>
        
   )
}
                    // {
                    //      detail  ?
        
    // </div>