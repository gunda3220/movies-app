import React from 'react'

const initState = {
    recent:[],
    popular:[],
    upcoming:[],
    searched:[],
    moviesLoading:false,
}

const moviesReducer = (state=initState,action) => {
    switch(action.type){
        case "FETCH_MOVIES":
            return {...state,
            recent:action.payload.recent.results,
            popular:action.payload.popular.results,
            upcoming:action.payload.upcoming.results,
            moviesLoading:true,}
        
        case "SEARCH_MOVIES":
            return {...state,
            searched:action.payload.search.results,}

        case "CLEAR_SEARCHED":
            return {...state,
            searched:[],}

        default:
            return {...state}
    }
}

export default moviesReducer
