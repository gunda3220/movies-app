import React from 'react';
import Styled from 'styled-components';
import {motion} from 'framer-motion';

const Loader = () => {
    return (
        <StyledLoaderDiv>
            <div className="loader"></div>
        </StyledLoaderDiv>
    )
}

const StyledLoaderDiv = Styled(motion.div)`
    position:fixed;
    z-index:31;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#1c1c1c5a;
    .loader{
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        border: 12px solid #f3f3f35a;
        border-radius: 50%;
        border-top: 12px solid white;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin{
        0%{
            transform:rotate(0deg);
        }
        100%{
            transform:rotate(360deg);
        }
    }
`;

export default Loader;
