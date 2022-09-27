import axios from 'axios';
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const FILTERED_COUNTRIES_BY_CONTINENT = "FILTERED_COUNTRIES"
export const FILTERED_COUNTRIES_BY_POPULATION = "FILTERED_COUNTRIES_BY_POPULATION"
export const FILTERED_COUNTRIES_BY_ALPHABETIC_ORDER = "FILTERED_COUNTRIES_BY_ALPHABETIC_ORDER"
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const POST_ACTIVITY = "POST_ACTIVITY"
export const FILTER_ACTIVITY = "FILTER_ACTIVITY"
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL"
export const CLEAN_UP_DETAIL = "CLEAN_UP_DETAIL"





export const getCountries = () => {
return async function(dispatch){
        let json = await axios.get("http://localhost:3001/countries",{})
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: json.data
        })
    }
}

export const filteredCountriesByContinent = (payload) => {
    return({
        type: FILTERED_COUNTRIES_BY_CONTINENT,
        payload
    })
}


export const filteredCountriesByPopulation = (payload) => {
    return({
        type: FILTERED_COUNTRIES_BY_POPULATION,
        payload
    })
}

export const filteredCountriesByAlphabeticOrder = (payload) => {
    return({
        type: FILTERED_COUNTRIES_BY_ALPHABETIC_ORDER,
        payload
    })
}


export const getCountryByName = (name) => {
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/countries?name=` + name);
        return dispatch({
            type:GET_COUNTRY_BY_NAME,
            payload: json.data
        })
    }
}


export const getActivities = () => {
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/activities")
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    };
}


export const postActivity = (payload) => {
    return async function (dispatch){
        let json = await axios.post("http://localhost:3001/activities", payload);
        return dispatch({
            type: POST_ACTIVITY,
            payload: json.data
        })
    }
}
export function filterActivity(payload){
    return{
        type: FILTER_ACTIVITY,
        payload
    }
}

export function getCountryDetail(id){
    return async function(dispatch){
        try {
            let json = await axios.get("http://localhost:3001/countries/" + id);
            console.log(json)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export function cleanUpDetail(){
    return {
        type: CLEAN_UP_DETAIL
    }
}