import React, {useState,useEffect,useRef} from 'react';
import { recentMoviesUrl } from "../api";
import { popularMoviesUrl } from "../api";
import {motion,AnimateSharedLayout,AnimatePresence} from 'framer-motion';
import styled from 'styled-components';
import {loadMovies} from "../actions/moviesAction";
import {loadMovieDetails} from "../actions/detailAction";
import {useDispatch,useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Movie from '../components/Movie';
import {pageAnimation,fadeIn,movieTabAnimation,titleAnimation} from "../animation";
import MovieDetail from '../components/MovieDetail';
import Loader from "../components/Loader";

const Home = ({updateAppHeightHandler}) => {

    const location = useLocation();

    const pathId = location.pathname.split("/")[2];

    const {recent,popular,searched,upcoming,moviesLoading} = useSelector(state => state.movies)

    const {isLoading} = useSelector(state => state.detail)

    const [recentMovieIds,setRecentMovieIds] = useState([]);

    const imageBaseUrl = "http://image.tmdb.org/t/p/original";

    const dispatch = useDispatch()
    useEffect(() =>{
       dispatch(loadMovies(dispatch)); 
       if(pathId){
           dispatch(loadMovieDetails(pathId));
       } 
    },[])

    useEffect(() => {
        let recentMovieIds = recent.map((movie) => movie.id);
        setRecentMovieIds(recentMovieIds);
    },[recent]);

    return (
       <>
           {moviesLoading && <MoviesContainer variants = {pageAnimation} initial = "hidden" animate = "show">
            <AnimateSharedLayout type = "crossfade">
            <AnimatePresence>
                {pathId && !isLoading && <MovieDetail imageBaseUrl = {imageBaseUrl} pathId = {pathId} updateAppHeightHandler = {updateAppHeightHandler}/>}
            </AnimatePresence>  

            {pathId && isLoading && <Loader />}

           {searched.length > 0 && <>
           <motion.h1 variants = {titleAnimation}>Searched Movies</motion.h1>
           <Movies>
               {searched.map(movie => {
                   if(movie.poster_path)
                   {
                    return (
                        <Movie  moviesLoading = {moviesLoading} title = {movie.title} imageBaseUrl = {imageBaseUrl} image = {movie.poster_path} overview = {movie.overview} id = {movie.id} key = {movie.id} rating = {movie.vote_average} language = {movie.original_language} releaseDate = {movie.release_date}/>
                       )
                   }
                   
               })}
           </Movies>
           </>}
           <motion.h1 variants = {titleAnimation} id = "Popular">Popular Movies</motion.h1>
            <Movies >
                {popular.map(movie => { 
                     if(movie.poster_path && ! recentMovieIds.includes(movie.id))
                     {
                        
                      return (
                          <Movie  moviesLoading = {moviesLoading} title = {movie.title} imageBaseUrl = {imageBaseUrl} image = {movie.poster_path} overview = {movie.overview} id = {movie.id} key = {movie.id} rating = {movie.vote_average} language = {movie.original_language} releaseDate = {movie.release_date}/>
                         )
                     }
                })}
            </Movies>

           <h1 id = "Recent">Recent Movies</h1>
            <Movies>
                {recent.map(movie => {
                     if(movie.poster_path)
                     {
                      return (
                          <Movie  moviesLoading = {moviesLoading} title = {movie.title} imageBaseUrl = {imageBaseUrl} image = {movie.poster_path} overview = {movie.overview} id = {movie.id} key = {movie.id} rating = {movie.vote_average} language = {movie.original_language} releaseDate = {movie.release_date} />
                         )
                     }
                })}
            </Movies>

            <h1 id = "Upcoming">Upcoming Movies</h1>
            <Movies>
                {upcoming.map(movie => {
                     if(movie.poster_path)
                     {
                      return (
                          <Movie  moviesLoading = {moviesLoading} title = {movie.title} imageBaseUrl = {imageBaseUrl} image = {movie.poster_path} overview = {movie.overview} id = {movie.id} key = {movie.id} rating = {movie.vote_average} language = {movie.original_language} releaseDate = {movie.release_date}/>
                         )
                     }
                })}
            </Movies>
           </AnimateSharedLayout>
           </MoviesContainer>}        
       </> 
    )
}


const MoviesContainer = styled(motion.div)`
    display:flex;
    flex-direction:column;
    width:90%;
    height:auto;
    margin:20px auto;
    h1{
        text-align:center;
        margin:30px auto;
        font-family: 'Raleway', sans-serif;
        font-weight:bold;
        color:#03ca74;
    }
    @media(max-width:768px)
    {
        width:100%;
    }
`;

const Movies = styled(motion.div)`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
`;

export default Home
