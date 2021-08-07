import React, {useEffect,useRef,useState} from 'react';
import styled from 'styled-components';
import {motion,AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

const MediaSection = ({imageBaseUrl}) => {

    const {posters,backdrops,videos} = useSelector(state => state.detail);

    const [navIndex,setNavIndex] = useState(0);

    const mediaContent = useRef([]);
    const mediaNavLinks = useRef([]);

    const getYoutubeThumbUrl = (key) => {
        let url = `https://img.youtube.com/vi/${key}/0.jpg`;
        return url;
    } 

    const getYoutubeVideoUrl = (key) => {
        let url = `https://www.youtube.com/watch?v=${key}`;
        return url;
    }

    useEffect(() => {
        mediaNavLinks.current.forEach((element,index) => {
            element?.addEventListener("click",(e) => {
                setNavIndex(index);
                mediaContent.current.forEach((mediaElement,mediaIndex) =>{                   
                    if(mediaIndex !== index)
                    {
                        mediaElement.classList.remove("active");
                        mediaElement.style.zIndex = -1;
                    }
                    else{
                        mediaElement.classList.add("active");
                        mediaElement.style.zIndex = 11;
                    }
                })
            });
        });
    },[]);

    return (
        <StyledMediaSection>
            <div className="media-nav">
                <ul>
                    <li ref={(element) => {mediaNavLinks.current[0] = element}}>
                        <h4>Posters</h4>
                        <Line initial = {{width:"0%"}} animate = {{width:navIndex === 0? '100%':"0%"}} transition = {{duration:0.75}}></Line>
                    </li>
                    <li ref={(element) => {mediaNavLinks.current[1] = element}}>
                        <h4>Backdrops</h4>
                        <Line initial = {{width:"0%"}} animate = {{width:navIndex === 1? '100%':"0%"}} transition = {{duration:0.75}}></Line>
                    </li>
                    <li ref={(element) => {mediaNavLinks.current[2] = element}}>
                        <h4>Videos</h4>
                        <Line initial = {{width:"0%"}} animate = {{width:navIndex === 2? '100%':"0%"}} transition = {{duration:0.75}}></Line>
                    </li>
                </ul>
            </div>
            <AnimatePresence>
                <div className="media-container">
                    <motion.div className="media-content posters active" ref={(element) => {mediaContent.current[0] = element}} initial = {{opacity:0}} animate = {{opacity:navIndex === 0?1:0}} transition = {{duration:0.75}} exit = {{opacity:0}}>
                        {posters.map((poster) =>
                        { 
                        if(poster.aspect_ratio > 0.65 ){
                            return (
                                <img key = {poster.file_path} src = {`${imageBaseUrl}${poster.file_path}`}/>
                            )
                            }
                         }                      
                        )}
                    </motion.div>
                    <motion.div className="media-content backdrops" ref={(element) => {mediaContent.current[1] = element}} initial = {{opacity:0}} animate = {{opacity:navIndex === 1?1:0}} transition = {{duration:0.75}} exit = {{opacity:0}}>
                        {backdrops.map(backdrop => <img key = {backdrop.file_path} src = {`${imageBaseUrl}${backdrop.file_path}`}/>)}
                    </motion.div>
                    <motion.div className="media-content videos" ref={(element) => {mediaContent.current[2] = element}} initial = {{opacity:0}} animate = {{opacity:navIndex === 2?1:0}} transition = {{duration:0.75}} exit = {{opacity:0}}>
                        {videos.map(video => <a key = {video.key} href = {getYoutubeVideoUrl(video.key)} target = "_blank">
                            <img src = {getYoutubeThumbUrl(video.key)} />
                            <i className="fab fa-youtube"></i>
                        </a>)}
                    </motion.div>
                </div>
            </AnimatePresence>          
        </StyledMediaSection>
    )
}

const StyledMediaSection = styled(motion.div)`
    display:flex;
    flex-direction:column;
    position:relative;
    width:90%;
    margin:30px auto;
    .media-nav{
        display:flex;
        margin-bottom:20px;
        ul{
            display:flex;
            list-style:none;
            align-items:center;
            li{
                margin-right:20px;
                cursor:pointer;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                h4{
                    margin-bottom:3px;
                }
            }
        }
    }
    .media-container{
        width:100%;
        height:380px;
        position:relative;
        .media-content{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        z-index:-1;
        height:auto;
        overflow-x:auto;
        padding: 20px 0;
        white-space: nowrap;
        ::-webkit-scrollbar{
            height:10px;
        }
        ::-webkit-scrollbar-track{
            background: #f1f1f1;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb{
            background: #888;
            border-radius: 5px;
        }
        img{
            display:inline-block;
            width:250px;
            height:auto;
        }
        }
        .posters{
            z-index:11;
        }
        .backdrops{
            img{
                width:667px;
                height:auto;
            }
        }
        .videos{
            a{
                width:400px;
                display:inline-block;
                height:auto;
                position:relative;
                text-decoration:none;
                img{
                    width:100%;
                    height:auto;
                }
                .fab{
                    position:absolute;
                    left:50%;
                    top:50%;
                    transform:translate(-50%,-50%);
                    color:#ff3939;
                    font-size:4em;
                    z-index:11;
                    transition:all 0.5s ease;
                }
                :hover .fab{
                    opacity:0.7;
                }
            }
        }
    }    
`;

const Line = styled(motion.div)`
    height:3px;
    background-color:#03ca74;
    width:100%;
`;

export default MediaSection
