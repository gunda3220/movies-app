import React, {useEffect,useState} from 'react';
import styled from 'styled-components';
import {motion,AnimatePresence} from 'framer-motion';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { loadMovieDetails,clearDetails } from '../actions/detailAction';
import {ColorExtractor} from 'react-color-extractor';
import RatingSection from "./RatingSection";
import ScrollableList from './ScrollableList';
import MediaSection from './MediaSection';

const MovieDetail = ({pathId,imageBaseUrl,updateAppHeightHandler}) => {

    const {title,image,isLoading,release_date,language,overview,average_vote,vote_count,rating,backdrop_image,genres,runTime,tagLine,cast,crew} = useSelector(state => state.detail);

    const {scrollPos,appHeight} = useSelector(state => state.others);

    const timeHrs = Math.floor(runTime/60);

    const timeMins = runTime%60;

    const pcolors = ['#03ca74','yellow','orange','red'];

    var progressColor = pcolors[0];
    if(rating > 8)
    {
        progressColor = pcolors[0];
    }
    else if(rating > 6)
    {
        progressColor = pcolors[1];
    }
    else if(rating > 4)
    {
        progressColor = pcolors[2];
    }
    else if(rating > 0){
        progressColor = pcolors[3];
    }

    const ratingDecimal = rating/10;
    const ratingPercent = rating*10;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovieDetails(pathId));
        updateAppHeightHandler();  
    },[]);

    const history = useHistory();

    const [colors,setColors] = useState([]);

    const exitHandler = (e) =>{

        if(e.target.classList.contains("detail-container"))
        {
            document.body.style.overflow = 'auto';
            document.body.scrollTop = scrollPos; 
            document.documentElement.scrollTop = scrollPos;
            history.push("/");            
            setTimeout(()=>{
                dispatch(clearDetails());
            },1000)
            
        }
    }

    const getGradientColors = (colors) => {
        setColors([colors[0],colors[1],colors[2],colors[3],colors[4],colors[5]]);       
    }

    return (
        <AnimatePresence>
            <DetailContainer onClick = {exitHandler} className = "detail-container"  appHeight = {appHeight}>  
            <StyledMovieDetail layoutId = {pathId} scrollPos = {scrollPos+"px"}>
            <Banner colors = {colors}>
                <div className="banner-image">
                    <img src={`${imageBaseUrl}${backdrop_image}`} onError = {(e)=> e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' }alt=""/> 
                </div>
                                              
                <InfoSection>
                    <div className="poster-image">
                        <ColorExtractor getColors={getGradientColors}>
                            <img src={`${imageBaseUrl}${image}`} alt=""/>
                        </ColorExtractor>                      
                    </div>
                    <div className="info">
                        <h1>{title} ({release_date.split("-")[0]})</h1>  
                        <div className="facts">
                            <div id = "release-date" className ="fact-info">Released on: {release_date} &nbsp;</div>
                            {genres?.map((genre,index) => <div key = {index} className = "fact-info">{index>0?", ":""}{genre.name} {index==genres.length-1?<span>&nbsp;</span>:""}</div>)}
                            <div id = "runtime" className = "fact-info">{timeHrs}h  {timeMins}mins</div>
                        </div>
                        <div className="options">                           
                            <RatingSection ratingDecimal = {ratingDecimal} ratingPercent = {ratingPercent} progressColor = {progressColor}/>
                            <div className="option-icon">
                                <i className="fas fa-list-ul"></i>
                            </div>
                            <div className="option-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="option-icon">
                                <i className="fas fa-bookmark"></i>
                            </div>
                            <div className="option-icon">
                                <i className="fas fa-star"></i>
                            </div>
                        </div>  
                        <p className = "tagline"><em>{tagLine}</em></p>      
                        <h2>Overview</h2>
                        <p>{overview}</p>            
                    </div>
                </InfoSection>
            </Banner>
            {cast.length > 0 && <>
                <h1>Cast</h1>
                <ScrollableList listArray = {cast} key = {1} />
            </>}
            {crew.length > 0 && <>
                <h1>Crew</h1>
                <ScrollableList listArray = {crew} key = {2} />
            </>} 
            <MediaSection imageBaseUrl = {imageBaseUrl} />         
            </StyledMovieDetail>
        </DetailContainer> 
        </AnimatePresence>            
    )
}

const DetailContainer = styled(motion.div)`
    width:100%;
    min-height:${props => props.appHeight+"px"};
    height:auto;
    background-color:#1c1c1c5a;
    z-index:31;
    position:absolute;
    left:0;
    top:0px;
    padding:100px;
    padding-top:30px;
    @media(max-width:768px)
    {
        padding:20px;
    }
`;

const StyledMovieDetail = styled(motion.div)`
    display:flex;
    flex-direction:column;
    width:100%;
    position:relative;
    align-items:flex-start;
    justify-content:center;
    min-height:100vh;
    background-color:white;
    border-radius:10px;
    padding-bottom:80px;
    margin-top:${props => props.scrollPos};
    z-index:31;
    overflow:hidden;
    > h1{
        color:black;
        margin:20px auto;
    }
`;

const Banner = styled(motion.div)`
    position:relative;
    width:100%;
    height:auto;
    min-height:60vh;
    .banner-image{
        width:100%;
        position:absolute;
        height:100%;
        left:0;
        top:0;      
        z-index:-1;
        img{
        width:100%;
        height:100%;  
        object-fit:cover;
        object-position:left;     
        }
    :after{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0;
            content:'';
            background:linear-gradient(to right bottom,${props => props.colors[0]},${props => props.colors[2]});
            opacity:0.7;
        }
    } 
    @media(max-width:768px)
    {
        .banner-image{
            img{
                object-position:center;
            }
        }
    } 
`;


const InfoSection = styled(motion.div)`
    width:100%;
    height:auto;
    position:relative;
    z-index:31;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    .poster-image{
        width:30%;
        height:auto;
        border-radius:10px;
        overflow:hidden;
        img{
            width:100%;
            height:auto;
        }
    }
    .info{
        width:65%;
        height:auto;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:flex-start;
        color:white;
        .facts{
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            color:white;
            .fact-info{
                position:relative;
                font-weight:bold;
            }
            #release-date{
                margin-right:20px;
                :after{
                    font-family: 'Font Awesome\ 5 Free';
                    content:'\f111';
                    color:white;
                    font-size:0.6em;
                    position:absolute;
                    left:100%;
                    top:60%;
                    transform:translateY(-50%);
                }
            }
            #runtime{
                margin-left:20px;
                :before{
                font-family: 'Font Awesome\ 5 Free';
                content:'\f111';
                color:white;
                font-size:0.6em;
                position:absolute;
                left:-25%;
                top:60%;
                transform:translateY(-50%); 
                }
            }
        }
        > h1{
            color:white;
            letter-spacing:3px;
            text-align:left;
            margin-right:auto;
            margin-left:0;
        }
        .options{
            display:flex;
            align-items:center;
            position:relative;
            justify-content:space-around;
            width:100%;
            max-width:500px;
            margin:20px 0;
            .rating{
                width:70px;
                height:70px;
                position:relative;
                margin-right:50px;
                :after{
                    content:"User Score";
                    position:absolute;
                    left:110%;
                    top:0;
                    width:auto;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:white;
                    font-weight:bold;
                    font-size:1.2em;
                }
            }
            .option-icon{
                cursor:pointer;
                width:50px;
                height:50px;
                border-radius:50%;
                background-color:#1e1e1e56;
                backdrop-filter:blur(5px);
                color:white;
                display:flex;
                align-items:center;
                justify-content:center;
                transition:all 0.3s ease;
                :hover{
                    color:#ccc7c7;
                }
            }
        }
        > h2 {
            margin:20px 0;
        }

    }
    @media(max-width:768px)
    {
        flex-direction:column;
        padding:20px 0;
        .poster-image{
            width:50%;
        }
        .info{
            width:90%;
            > h1{
                text-align:center;
            }
            .options .rating:after{
                font-size:1em;
            }
        }
    }
`;



export default MovieDetail
