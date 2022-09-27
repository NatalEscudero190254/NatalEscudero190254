import { CLEAN_UP_DETAIL, FILTERED_COUNTRIES_BY_ALPHABETIC_ORDER, FILTERED_COUNTRIES_BY_CONTINENT, FILTERED_COUNTRIES_BY_POPULATION, FILTER_ACTIVITY, GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAIL, POST_ACTIVITY} from '../actions/index';



const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case FILTERED_COUNTRIES_BY_CONTINENT:
            const allCountries = state.allCountries;
            const filteredCountries = action.payload === "All" ? allCountries : allCountries.filter((e) => e.continent === action.payload)
        
            return{
                ...state,
                countries: filteredCountries
            }
        case FILTERED_COUNTRIES_BY_POPULATION:
            
            let sortByPop = action.payload === "max" ?
            state.countries.sort(function(a, b){
                if(a.population > b.population){
                    return -1
                }
                if(b.population > a.population){

                return 1
                }

                return 0
            }):

            state.countries.sort(function(a,b){
                if(a.population > b.population){
                    return 1
                }
                if(b.population > a.population){
                    return -1
                }
                return 0
            })
            
            return{
                ...state,
                countries: sortByPop

            }
        case FILTER_ACTIVITY:
                let filter = action.payload === 'sin filtro'?state.allCountries : state.allCountries.filter((country)=>{
                    const activities= country.activities.map((a)=>a.name)
                    return activities.includes(action.payload)
                })
                                      
                return {
                    ...state,
                    countries: filter
                }
        case FILTERED_COUNTRIES_BY_ALPHABETIC_ORDER:
            let sortByAlph = action.payload === "a" ?
            state.countries.sort(function(a, b){
                if(a.population > b.population){
                    return -1
                }
                if(b.population > a.population){

                return 1
                }

                return 0
            }):

            state.countries.sort(function(a,b){
                if(a.population > b.population){
                    return 1
                }
                if(b.population > a.population){
                    return -1
                }
                return 0
            })
        
            return{
                ...state,
                countries:sortByAlph

            }
        case GET_COUNTRY_BY_NAME:
            
            
            return{
                ...state,
                countries: action.payload,

            }

        case GET_ACTIVITIES:
            return{
             ...state,
             activities:action.payload   
            }

        case POST_ACTIVITY:
                return {
                    ...state,
                    activities: [...state.activities, action.payload]
                }

        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                detail: action.payload

            }
        
        case CLEAN_UP_DETAIL:
            return {
                ...state,
                detail: []
            }

        default:
            return {...state}

    }
    
}