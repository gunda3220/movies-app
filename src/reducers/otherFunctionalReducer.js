import React from 'react'

const initState = {
    scrollPos:0,
    appHeight:0,
} 

const otherFunctionalReducer = (state=initState,action) => {
    switch(action.type){
        case "SET_SCROLL_POS":
            return{
                ...state,
                scrollPos:action.payload,
            };

        case "UPDATE_APP_HEIGHT":
            return{
                ...state,
                appHeight:action.payload,
            }
            
        default:
            return{...state};
    }
}

export default otherFunctionalReducer
