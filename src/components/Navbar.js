import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {fetchSearch} from "../actions/moviesAction";
import {fadeIn,navFadeIn} from "../animation";
import tmdb_logo from "../assets/images/tmdb_logo.svg";

const Navbar = () => {

    const [textInput,setTextInput] = useState('');

    const dispatch = useDispatch();

    const inputHandler = (e) =>{
        setTextInput(e.target.value);
    }

    const searchHandler = (e) =>{
        e.preventDefault();
        if(textInput.length > 0)
        {
            dispatch(fetchSearch(textInput));
            setTextInput("");
        }  
    }

    const clearSearched = () =>{
        dispatch({
            type:"CLEAR_SEARCHED",
        })
    }

    return (
        <Nav variants = {navFadeIn} initial = "hidden" animate = "show">
            <img onClick = {clearSearched} id = "logo" src={tmdb_logo} alt=""/>
            <form action="" onSubmit = {searchHandler}>
                <input onChange = {inputHandler} value = {textInput} type="text"/>
                <motion.button whileHover ={{scale:1.1}} transition ={{ duration:0.5}} type = "submit">Search</motion.button>
            </form>
        </Nav>        
    )
}

const Nav = styled(motion.div)`
    width:100%;
    height:auto;
    padding:20px 30px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    img{
        width:200px;
        height:auto;
        margin:30px auto;
        cursor:pointer;
    }
    form{
        display:flex;
        align-items:center;
        justify-content:space-around;
        input{
            border:0;
            width:400px;
            padding:12px;
            box-shadow:0px 0px 15px 5px #dcdcdc;
            :focus{
                border:0;
                outline:0;
            }
        }
        button{
            padding:10px 20px;
            border:0;
            /* background-color:#8ACDA4; */
            background:linear-gradient(to bottom right,#8ACDA4,#05B4E2);
            font-size:1.2rem;
            cursor:pointer;
            color:white;
        }
    }
    @media(max-width:500px)
    {
        padding:15px;
        form{
            width:100%;
        }
    }

`

export default Navbar
