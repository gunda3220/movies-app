import {recentMoviesUrl,popularMoviesUrl,searchByNameUrl,upcomingMoviesUrl} from '../api';

export const loadMovies = () => async(dispatch) => {
    let recentMovies = await fetch(recentMoviesUrl());
    recentMovies = await recentMovies.json();
    let popularMovies = await fetch(popularMoviesUrl());
    popularMovies = await popularMovies.json();
    let upcomingMovies = await fetch(upcomingMoviesUrl());
    upcomingMovies = await upcomingMovies.json();

    dispatch ({
        type:"FETCH_MOVIES",
        payload:{
            recent:recentMovies,
            popular:popularMovies,
            upcoming:upcomingMovies,
        },
    });
}

export const fetchSearch = (textInput) => async(dispatch) => {
    let searchMovies = await fetch(searchByNameUrl(textInput));
    searchMovies = await searchMovies.json();
    dispatch({
        type:"SEARCH_MOVIES",
        payload:{
            search:searchMovies,
        },
    })
}
