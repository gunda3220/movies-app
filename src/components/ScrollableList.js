import React ,{useRef,useEffect} from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import waves from '../assets/images/waves.svg';

const ScrollableList = ({listArray}) => {

    const imageCastUrl = "http://image.tmdb.org/t/p/w200";

    const memberRef = useRef(null);

    const listDragHandler = (e) =>{
        console.log("drag happened");
        console.log(e.target);
    }

    return (
            <ListContainer>
                <div className="list" onDrag = {listDragHandler}>
                    {listArray.map((member,index) => {
                        if(member.profile_path)
                        {
                            return(
                                <StyledMember ref = {memberRef} key = {member.cast_id?member.cast_id:member.credit_id}>
                                    <div className="inner-member">
                                        <div className = "member-profile">
                                             <img src={`${imageCastUrl}${member.profile_path}`} alt=""/>
                                        </div>                                      
                                        <div className="member-info">
                                            <p>{member.name}</p>
                                            <p>{member.character?member.character:member.job}</p>
                                        </div>
                                    </div>                                   
                                </StyledMember>
                            )
                        }
                        })
                    }
                </div>
            </ListContainer>
    )
}

const StyledMember = styled(motion.div)`
    display:inline-block;
    width:170px;
    pointer-events:none;
    height:auto;
    border-radius:5px;
    box-shadow:0px 0px 20px #1e1e1e3a;
    margin:0 20px;
    overflow:hidden;
    .inner-member{
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        width:100%;
        height:auto;
        position:relative;
        backdrop-filter:blur(2px);
        background-color:#07B5E333;
       
        .member-profile{
            position:relative;
            width:100%;
            height:auto;
            img{
                position:relative;
                width:100%;
                height:100%;
                object-fit:contain;
                object-position:center;
            }
        }

        .member-info{
            position:relative;
            display:flex;
            padding:5px 5px 5px 10px;
            min-height:80px;
            flex-direction:column;
            justify-content:center;
            white-space: initial;
            
        }
    }
`;

const ListContainer = styled(motion.div)`
    position:relative;
    width:90%;
    margin:0 auto;
    background-color:white;
    background: white url(${waves});
    background-repeat:no-repeat;
    background-position-y:bottom;
    border-radius:5px;
    height:auto;
    :after{
            content:'';
            position:absolute;
            top:0;
            left:100%;
            width:0px;
            height:100%;
            box-shadow:-10px 0px 100px 50px #e8e9eb;
            z-index:12;  
        }
    .list{
        position:relative;
        width:auto;
        height:auto;
        padding:20px 0;
        overflow: auto;
        white-space: nowrap;
         
        ::-webkit-scrollbar{
            height:10px;
        }
        ::-webkit-scrollbar-track{
            background:#f1f1f1;
            border-radius:5px;
        }
        ::-webkit-scrollbar-thumb{
            background:#888;
            border-radius:5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }
`;

export default ScrollableList
