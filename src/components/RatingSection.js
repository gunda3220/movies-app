import React from 'react';
import styled from "styled-components";
import {ratingAnimation} from "../animation";
import {motion} from "framer-motion";

const RatingSection = ({ratingDecimal,progressColor,ratingPercent}) => {
    return (
        <StyledRating className="rating">
            <div className="rating-div">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path variants = {ratingAnimation(ratingDecimal)} initial = "hidden" animate = "show" d="M95 50C95 74.8528 74.8528 95 50 95C25.1472 95 5 74.8528 5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50Z" strokeWidth="10" stroke = {progressColor} /> 
                </svg>
                <p><span>{ratingPercent}</span>%</p>
            </div>         
         </StyledRating>
    )
}

const StyledRating = styled(motion.div)`
        border-radius:50%;
        display:flex;
        background-color:#3a3a3a5a;
        backdrop-filter:blur(5px);
        .rating-div{
            position:relative;
            width:100%;
            height:100%;
            svg{
            height:90%;
            width:90%;
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%) rotate(-90deg);
            stroke:white;
            }
            p{
                position:absolute;
                font-weight:bold;
                left:50%;
                top:50%;
                color:white;
                transform:translate(-50%,-50%);
                margin:0;
                font-size:0.8em;
                span{
                    font-size:1.5em;
                }
            }
        }     
`;

export default RatingSection
