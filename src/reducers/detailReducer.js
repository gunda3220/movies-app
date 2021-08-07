import React from 'react'
const initState = {
    title:"",
    isLoading:true,
    image:"",
    release_date:"",
    language:"",
    overview:"",
    vote_count:0,
    rating:0,
    backdrop_image:"",
    genres:[],
    tagLine:"",
    cast:[],
    crew:[],
    posters:[],
    backdrops:[],
    videos:[],
}

const detailReducer = (state=initState,action) => {
    switch(action.type){
        case "GET_DETAILS":
            return{
                ...state,
                title:action.payload.title,
                isLoading:false,
                image:action.payload.poster_path,
                release_date:action.payload.release_date,
                language:action.payload.language,
                overview:action.payload.overview,
                vote_count:action.payload.vote_count,
                rating:action.payload.vote_average,
                backdrop_image:action.payload.backdrop_path,
                isLoading:false,
                genres:action.payload.genres,
                runTime:action.payload.runtime,
                tagLine:action.payload.tagline,
                cast:action.castAndCrewData.cast,
                crew:action.castAndCrewData.crew,
                posters:action.images.posters,
                backdrops:action.images.backdrops,
                videos:action.videos.results,
            };

        case "LOADING_DETAIL":
            return{
                ...state,isLoading:true,
            }

        case "CLEAR_DETAILS":
            return {
                title:"",
                isLoading:true,
                image:"",
                release_date:"",
                language:"",
                overview:"",
                vote_count:0,
                rating:0,
                backdrop_image:"",
            }

        default:
            return{...state};
    }
}

export default detailReducer;
