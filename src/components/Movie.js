import React, {useEffect,useRef,useState} from 'react';
import styled from "styled-components";
import {motion,AnimatePresence} from "framer-motion";
import {movieTabAnimation,ratingAnimation} from "../animation";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loadMovieDetails} from "../actions/detailAction";
import RatingSection from "./RatingSection";
import {updateScrollPos} from "../actions/otherFunctionalAction";
import loadingGif from "../assets/images/loading.gif";

const Movie = ({title,image,imageBaseUrl,overview,rating,language,releaseDate,id,moviesLoading}) => {

    const stringPathId = id.toString();

    const colors = ['#03ca74','yellow','orange','red'];

    var progressColor = colors[0];
    if(rating > 8)
    {
        progressColor = colors[0];
    }
    else if(rating > 6)
    {
        progressColor = colors[1];
    }
    else if(rating > 4)
    {
        progressColor = colors[2];
    }
    else if(rating > 0){
        progressColor = colors[3];
    }

    overview = overview.slice(0,200);
    overview = overview+"....."

    const imageUrl = imageBaseUrl+image;
    const altImageUrl = "https://image.shutterstock.com/image-illustration/black-linear-photo-camera-logo-260nw-1412111903.jpg";

    const imageRef = useRef(null);

    const ratingDecimal = rating/10;
    const ratingPercent = rating*10;

    const overviewRef = useRef(null);
    const movieTabRef = useRef(null);

    const dispatch = useDispatch();

    const overviewSlideUp = () =>{
        overviewRef.current.style.top = `0px`;
        // let imageHeight1 =  imageRef.current.offsetHeight;
        // overviewRef.current.style.height = `${imageHeight1}px`;
    }

    const overviewSlideDown = () =>{
        overviewRef.current.style.top = "100%";
    }

    const loadDetailHandler = () =>{
        // document.body.style.overflow = "hidden";
        let scrollPos = document.documentElement.scrollTop;
        dispatch(updateScrollPos(scrollPos))
        dispatch(loadMovieDetails(id))
    }

    return (
        <AnimatePresence>
        <StyledMovie layoutId = {stringPathId} onMouseOver = {overviewSlideUp} onMouseOut = {overviewSlideDown} onClick = {loadDetailHandler} ref = {movieTabRef} variants = {movieTabAnimation} >
            <Link to = {`/movie/${id}`}>
            <h4>{title}</h4>
            <div className="image-section">
                <img ref={imageRef} src={imageUrl} onError={(e)=>{e.target.src=altImageUrl}}/>
                <Overview ref = {overviewRef} className = "overview">
                    <p>{overview}</p>
                </Overview>
            </div>           
            </Link>
            <RatingSection ratingDecimal = {ratingDecimal} progressColor = {progressColor} ratingPercent = {ratingPercent}/>         
        </StyledMovie>
        </AnimatePresence>        
    )
}

const StyledMovie = styled(motion.div)`
    display:flex;
    width:15%;
    min-width:200px;
    height:auto;
    position:relative;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    border-radius:10px;
    box-shadow:0px 0px 20px #dcdcdc;
    margin:20px;
    /* opacity:1 !important; */
    /* overflow:hidden; */
    cursor:pointer;
    .image-section{
        width:100%;
        height:auto;
        display:flex;
        flex-direction:column;
        position:relative;
        overflow:hidden;
        border-radius:0px 0px 10px 10px;
        min-height:200px;
        background:url(${loadingGif}) no-repeat;
        background-size:cover;
        background-position:center;
        img{
        width:100%;
        height:auto;       
        }
    }
   
    a{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
        text-decoration:none;
        color:black;
        position: relative;
        width:100%;
        height:100%;
        h4{
            text-align:center;
            margin:10px;
            font-family:'Poppins',sans-serif;
        }
    }
    .rating{
        position:absolute;
        width:60px;
        height:60px;
        left:10px;
        bottom:0px;
        transform:translateY(50%);
    }
`;

const Overview  = styled(motion.div)`
    position:absolute;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    left:0;
    color:#08B4E1;
    top:100%;
    backdrop-filter:blur(5px);
    background-color:#ffffff3f;
    width:100%;
    height:100%;
    padding:10px;
    text-align:center;
    transition:all 0.5s ease-in-out;
    p{
        max-height:100%;
        font-size:1.1rem;
    }
`;

export default Movie
